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
const showProjectDetailsPage = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);

    if (!project) {
      return res.status(404).send('Project not found');
    }

    const title = project.title;
    res.render('project', { title, project });
  } catch (error) {
    console.error('Error fetching project details:', error);
    res.status(500).send('Server Error');
  }
};

export { showProjectsPage, showProjectDetailsPage };