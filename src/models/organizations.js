import { db } from './db.js' // <-- changed from default import

const getAllOrganizations = async() => {
    const query = `
        SELECT organization_id, name, description, contact_email, logo_filename
        FROM public.organizations
        ORDER BY name;
    `;

    const result = await db.query(query); // <-- this stays the same
    return result.rows;
}

export { getAllOrganizations }