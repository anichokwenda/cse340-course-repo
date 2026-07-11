import { pool } from './db.js'; // <-- import pool

// Get all service projects with their organization name
export async function getAllProjects() {
    const sql = `
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
    const result = await pool.query(sql); // <-- use pool.query
    return result.rows;
}