import { getAllOrganizations } from '../models/organizations.js';

export const organizationsPage = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();
        const title = 'Our Partner Organizations';

        res.render('organizations', { title, organizations });
    } catch (error) {
        next(error); // send errors to global handler
    }
};