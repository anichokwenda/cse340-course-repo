import { db } from './db.js' // <-- changed from pool to db

/**
 * Get all service projects with their organization name
 * @returns {Promise<Array>} Array of project objects
 */
const getAllProjects = async() => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.project_date,
            o.organization_id,
            o.name AS organization_name
        FROM public.service_projects p
        JOIN public.organizations o ON p.organization_id = o.organization_id
        ORDER BY p.project_date ASC;
    `;
    const result = await db.query(query); // <-- use db.query
    return result.rows;
}

export { getAllProjects } // <-- changed to named export for consistency