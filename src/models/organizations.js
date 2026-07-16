import { db } from './db.js'

/**
 * Get all organizations from the database
 * @returns {Promise<Array>} Array of organization objects
 */
const getAllOrganizations = async() => {
    const query = `
        SELECT organization_id, name, description, contact_email, logo_filename
        FROM public.organizations
        ORDER BY name;
    `;
    const result = await db.query(query);
    return result.rows;
}

/**
 * Get details of a specific organization from the database
 * @param {number} organizationId - The ID of the organization
 * @returns {Promise<Object|null>} Organization object or null
 */
const getOrganizationDetails = async (organizationId) => {
    const query = `
        SELECT
            organization_id,
            name,
            description,
            contact_email,
            logo_filename
        FROM public.organizations
        WHERE organization_id = $1;
    `;
    const result = await db.query(query, [organizationId]);
    return result.rows.length > 0? result.rows[0] : null;
}

export { getAllOrganizations, getOrganizationDetails }