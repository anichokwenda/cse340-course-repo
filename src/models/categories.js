import { db } from './db.js'

/**
 * Get all categories
 */
const getAllCategories = async() => {
    const query = `
        SELECT category_id, name
        FROM public.categories
        ORDER BY name;
    `;
    const result = await db.query(query);
    return result.rows;
}

/**
 * Retrieve a single category by its ID.
 */
const getCategoryById = async (categoryId) => {
  const query = `
    SELECT category_id, name
    FROM public.categories
    WHERE category_id = $1;
  `;
  const result = await db.query(query, [categoryId]);
  return result.rows[0];
};

/**
 * Retrieve all categories for a given service project.
 */
const getCategoriesByProjectId = async (projectId) => {
  const query = `
    SELECT c.category_id, c.name
    FROM public.categories c
    JOIN public.project_categories pc ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name;
  `;
  const result = await db.query(query, [projectId]);
  return result.rows;
};

/**
 * Retrieve all service projects for a given category.
 * Shows ALL projects, not just upcoming
 */
const getProjectsByCategoryId = async (categoryId) => {
  const query = `
    SELECT
      sp.project_id, sp.title, sp.project_date,
      o.organization_id, o.name AS organization_name
    FROM public.service_projects sp
    JOIN public.organizations o ON sp.organization_id = o.organization_id
    JOIN public.project_categories pc ON sp.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY sp.project_date DESC; -- newest first. Use ASC for oldest first
  `;
  const result = await db.query(query, [categoryId]);
  return result.rows;
};

export {
  getAllCategories,
  getCategoryById,
  getCategoriesByProjectId,
  getProjectsByCategoryId
}