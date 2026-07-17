// Import any needed model functions
import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId
} from '../models/categories.js';

// Show all categories page
const showCategoriesPage = async (req, res, next) => {
    try {
        const categories = await getAllCategories();
        const title = 'Service Categories';

        res.render('categories', { title, categories, category: null, projects: [] });
    } catch (error) {
        next(error);
    }
};

// Show single category details page
const showCategoryDetailsPage = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    if (!category) return res.status(404).render('errors/404', { title: '404 - Category Not Found' });

    const projects = await getProjectsByCategoryId(categoryId);
    res.render('categories', { title: category.name, category, projects });
  } catch (error) {
    next(error);
  }
};

// Export any controller functions
export {
  showCategoriesPage,
  showCategoryDetailsPage
};