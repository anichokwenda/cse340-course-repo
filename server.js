import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1. Static files - keep this first
app.use(express.static(path.join(__dirname, 'public')));

// 2. Body parser for forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 3. Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// 4. Middleware to log all incoming requests
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] ${req.method} ${req.url}`);
    }
    next();
});

// 5. Middleware to make NODE_ENV available to all templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});

// ================== ROUTES ==================

// Home
app.get('/', async (req, res) => {
    res.render('home', { title: 'Home' });
});

// Organizations
app.get('/organizations', async (req, res, next) => { 
    try {
        const organizations = await getAllOrganizations();
        const title = 'Our Partner Organizations';
        res.render('organizations', { title, organizations });
    } catch (error) {
        next(error); // Pass to global error handler
    }
});

// Projects
app.get('/projects', async (req, res, next) => {
    try {
        const projects = await getAllProjects(); 
        const title = 'Service Projects';
        res.render('projects', { title, projects });
    } catch (error) {
        next(error);
    }
});

// Categories
app.get('/categories', async (req, res, next) => {
    try {
        const categories = await getAllCategories();
        const title = 'Project Categories';
        res.render('categories', { title, categories });
    } catch (error) {
        next(error);
    }
});

// 6. Test route for 500 errors
app.get('/test-error', (req, res, next) => {
    const err = new Error('This is a test error');
    err.status = 500;
    next(err);
});

// ================== ERROR HANDLING ==================

// 7. Catch-all route for 404 errors - MUST be after all routes
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

// 8. Global error handler - MUST be last and have 4 parameters
app.use((err, req, res, next) => {
    // Log error details for debugging
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);
    
    // Determine status and template
    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';
    
    // Prepare data for the template
    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: NODE_ENV === 'development' ? err.stack : null // Only show stack in dev
    };
    
    // Render the appropriate error template
    res.status(status).render(`errors/${template}`, context);
});

// ================== START SERVER ==================
app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});