import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

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
 * Routes - Only use res.render(), no duplicates
 */
app.get('/', async (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/organizations', async (req, res) => {
    res.render('organizations', { title: 'Our Partner Organizations' });
});

app.get('/projects', async (req, res) => {
    res.render('projects', { title: 'Service Projects' });
});

app.get('/categories', async (req, res) => {
    res.render('categories', { title: 'Project Categories' }); 
});

// 3. 404 handler - optional but good practice
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://127.0.0.1:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});