import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js'; // <-- NEW

const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1. Static files
app.use(express.static(path.join(__dirname, 'public')));

// 2. Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views')); // <-- your views are in src/views

// Routes
app.get('/', async (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/organizations', async (req, res) => { 
    try {
        const organizations = await getAllOrganizations();
        const title = 'Our Partner Organizations';
        res.render('organizations', { title, organizations });
    } catch (error) {
        console.error('Error fetching organizations:', error);
        res.status(500).send('Database error');
    }
});

app.get('/projects', async (req, res) => {
    try {
        const projects = await getAllProjects(); 
        const title = 'Service Projects';
        res.render('projects', { title, projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).send('Database error');
    }
});

// UPDATED: Categories Route with DB call
app.get('/categories', async (req, res) => {
    try {
        const categories = await getAllCategories(); // <-- get from DB
        const title = 'Project Categories';
        res.render('categories', { title, categories }); // <-- pass to EJS
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Database error');
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

// Start server
app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});