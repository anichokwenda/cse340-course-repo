import { getAllProjects } from '../models/projects.js';

const showProjectsPage = async (req, res) => {
  try {
    const projects = await getAllProjects();
    const title = 'All Projects';
    res.render('projects', { title, projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).send('Server Error');
  }
};

export { showProjectsPage };