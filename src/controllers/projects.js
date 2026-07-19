import { 
  getUpcomingProjects, 
  getProjectDetails // <-- this is the correct name from your model
} from '../models/projects.js';

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
        
        // FIX 1: was getProjectById, should be getProjectDetails
        const project = await getProjectDetails(projectId); 
        
        if (!project) return res.status(404).render('errors/404', { title: '404 - Project Not Found' });

        // FIX 2: categories are already included in getProjectDetails via array_agg
        // So we don't need a separate call. Just pass project.categories
        const categories = project.categories; 

        res.render('project', { title: project.title, project, categories });
    } catch (error) {
        next(error);
    }
};

export { showProjectsPage, showProjectDetailsPage };