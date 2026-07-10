import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js'; // DB test
import { getAllOrganizations } from './src/models/organizations.js'; // <-- MODEL

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1. Static files first - CSS, JS, images
app.use(express.static(path.join(__dirname, 'public')));

// 2. Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

/**
 * Routes - Now pulling from DB via Model
 */
app.get('/', async (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/organizations', async (req, res) => { 
    try {
        const organizations = await getAllOrganizations(); // <-- USE MODEL FUNCTION
        // console.log(organizations); // REMOVED - we don't need to print to terminal anymore
        
        const title = 'Our Partner Organizations';
        res.render('organizations', { title, organizations }); // <-- send data to EJS
    } catch (error) {
        console.error('Error fetching organizations:', error);
        res.status(500).send('Database error');
    }
});

app.get('/projects', async (req, res) => {
    res.render('projects', { title: 'Service Projects' });
});

app.get('/categories', async (req, res) => {
    res.render('categories', { title: 'Project Categories' }); 
});

// 3. 404 handler
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

// 4. Test DB connection before starting server
app.listen(PORT, async () => {
  try {
    await testConnection(); // Tests DB on startup
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});