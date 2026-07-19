import { db } from './db.js'

/**
  * Get all projects - for /projects list page
 */
const getAllProjects = async () => {
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.location,
      TO_CHAR(sp.project_date, 'FMMonth DD, YYYY') AS formatted_date, -- FIX
      sp.project_date,
      o.organization_id,
      o.name AS organization_name,
      o.logo_filename
    FROM public.service_projects sp
    JOIN public.organizations o ON sp.organization_id = o.organization_id
    ORDER BY sp.project_date ASC;
  `;
  const result = await db.query(query);
  return result.rows;
};

/**
  * Get projects for one organization - THIS FIXES YOUR SCREENSHOT
 */
const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.location,
      TO_CHAR(sp.project_date, 'FMMonth DD, YYYY') AS formatted_date, -- FIX
      sp.project_date,
      o.name AS organization_name,
      o.logo_filename
    FROM public.service_projects sp
    JOIN public.organizations o ON sp.organization_id = o.organization_id
    WHERE sp.organization_id = $1
    ORDER BY sp.project_date;
  `;
  const result = await db.query(query, [organizationId]);
  return result.rows;
};

/**
  * Get the next X upcoming projects with organization name
  * @param {number} number_of_projects
 */
const getUpcomingProjects = async (number_of_projects) => {
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      TO_CHAR(sp.project_date, 'FMMonth DD, YYYY') AS formatted_date, -- FIX
      sp.project_date,
      sp.location,
      o.name AS organization_name,
      o.logo_filename
    FROM public.service_projects sp
    JOIN public.organizations o ON sp.organization_id = o.organization_id
    ORDER BY sp.project_date ASC
    LIMIT $1;
  `;
  const result = await db.query(query, [number_of_projects]);
  return result.rows;
};

/**
  * Get details for one project by ID with organization name + categories
  * @param {number} id
 */
const getProjectDetails = async (id) => {
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      TO_CHAR(sp.project_date, 'FMMonth DD, YYYY') AS formatted_date, -- FIX
      sp.project_date,
      sp.location,
      o.organization_id,
      o.name AS organization_name,
      o.description AS org_description,
      o.contact_email,
      o.logo_filename,
      COALESCE(array_agg(c.name) FILTER (WHERE c.name IS NOT NULL), '{}') AS categories
    FROM public.service_projects sp
    JOIN public.organizations o ON sp.organization_id = o.organization_id
    LEFT JOIN public.project_categories pc ON sp.project_id = pc.project_id
    LEFT JOIN public.categories c ON pc.category_id = c.category_id
    WHERE sp.project_id = $1
    GROUP BY sp.project_id, o.organization_id;
  `;
  const result = await db.query(query, [id]);
  return result.rows[0];
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails };