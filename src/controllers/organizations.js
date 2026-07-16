import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

// Controller to render list of all organizations
const showOrganizationsPage = async (req, res) => {
  try {
    const organizations = await getAllOrganizations();
    const title = 'Partner Organizations';
    res.render('organizations', { title, organizations });
  } catch (error) {
    console.error('Error fetching organizations:', error);
    res.status(500).send('Server Error');
  }
};

// Controller function: Render organization details page
const showOrganizationDetailsPage = async (req, res) => {
  try {
    const organizationId = req.params.id;

    // Call both model functions
    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);

    const title = 'Organization Details';

    // If organization not found, send 404
    if (!organizationDetails) {
      return res.status(404).send('Organization Not Found');
    }

    // Pass data to the EJS view
    res.render('organization', { title, organizationDetails, projects });
  } catch (error) {
    console.error('Error fetching organization details:', error);
    res.status(500).send('Server Error');
  }
};

// Export any controller functions
export { showOrganizationsPage, showOrganizationDetailsPage };