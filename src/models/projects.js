import { db } from './db.js'

const getAllProjects = async () => {
  const query = `
    SELECT
      project_id,
      organization_id,
      title,
      description,
      location,
      project_date
    FROM public.service_projects
    ORDER BY project_date DESC;
  `;
  const result = await db.query(query);
  return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT
      project_id,
      organization_id,
      title,
      description,
      location,
      project_date
    FROM public.service_projects
    WHERE organization_id = $1
    ORDER BY project_date;
  `;
  const result = await db.query(query, [organizationId]);
  return result.rows;
};

export { getAllProjects, getProjectsByOrganizationId };