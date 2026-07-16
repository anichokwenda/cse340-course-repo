import express from 'express';

import { showHomePage } from './controllers/home.js';
import { showOrganizationsPage, showOrganizationDetailsPage } from './controllers/organizations.js'; // added showOrganizationDetailsPage
import { showProjectsPage } from './controllers/projects.js';
import { showCategoriesPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', showHomePage);
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage); // <-- NEW: org details page
router.get('/projects', showProjectsPage);
router.get('/categories', showCategoriesPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;