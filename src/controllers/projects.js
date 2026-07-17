import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

/**
 * Show the main projects page with only upcoming projects
 */
const showProjectsPage = async (req, res) => {
  try {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';
    res.render('projects', { title, projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).send('Server Error');
  }
};

/**
 * Show details for one specific project
 */
const showProjectDetailsPage = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const project = await getProjectById(projectId);
        if (!project) return res.status(404).render('errors/404', { title: '404 - Project Not Found' });

        const categories = await getCategoriesByProjectId(projectId);

        res.render('project', { title: project.title, project, categories });
    } catch (error) {
        next(error);
    }
};

export { showProjectsPage, showProjectDetailsPage };