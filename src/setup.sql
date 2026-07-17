-- ============================================
-- DROP TABLES IF THEY EXIST
-- ============================================
DROP TABLE IF EXISTS public.project_categories CASCADE;
DROP TABLE IF EXISTS public.service_projects CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.organizations CASCADE;

-- ============================================
-- 1. ORGANIZATIONS TABLE
-- ============================================
CREATE TABLE public.organizations (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ============================================
-- 2. CATEGORIES TABLE
-- ============================================
CREATE TABLE public.categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ============================================
-- 3. SERVICE PROJECTS TABLE
-- ============================================
CREATE TABLE public.service_projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES public.organizations(organization_id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(200) NOT NULL,
    project_date DATE NOT NULL
);

-- ============================================
-- 4. JOIN TABLE: PROJECT_CATEGORIES
-- ============================================
CREATE TABLE public.project_categories (
    project_id INT NOT NULL REFERENCES public.service_projects(project_id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES public.categories(category_id) ON DELETE CASCADE,
    CONSTRAINT pk_project_category PRIMARY KEY (project_id, category_id)
);

-- ============================================
-- SEED DATA
-- ============================================

-- Insert 3 Organizations
INSERT INTO public.organizations (name, description, contact_email, logo_filename) 
VALUES 
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- Insert 15 Categories
INSERT INTO public.categories (name) VALUES
('Food Security'), ('Environmental'), ('Education & Youth'), ('Health & Wellness'), ('Animal Welfare'),
('Community Development'), ('Disaster Relief'), ('Arts & Culture'), ('Senior Services'), ('Youth Mentoring'),
('Housing'), ('Poverty'), ('Veterans'), ('Civil Rights'), ('Technology');

-- Insert 15 Projects
INSERT INTO public.service_projects (organization_id, title, description, location, project_date) VALUES
(1, 'Build Community Center', 'Volunteers will help build a new community center for after-school programs.', 'Downtown Harare', '2026-08-15'),
(1, 'Home Renovation Drive', 'Renovate 10 homes for elderly residents.', 'Eastview Suburb', '2026-08-02'),
(1, 'Park Cleanup & Build', 'Clean up city park and install new benches and playground equipment.', 'Central Park', '2026-08-20'),
(1, 'School Repairs', 'Paint classrooms and fix desks at Riverside Primary.', 'Riverside Primary', '2026-09-10'),
(1, 'Disaster Relief Housing', 'Build emergency shelters for families affected by floods.', 'Mbare Community', '2026-09-01'),
(2, 'Community Garden Setup', 'Start a community garden to provide fresh produce to local families.', 'Greenfield Lot 12', '2026-08-22'),
(2, 'Urban Farming Workshop', 'Teach residents how to grow vegetables in small spaces.', 'Community Hall', '2026-11-05'),
(2, 'Tree Planting Initiative', 'Plant 200 fruit trees around the city.', 'Citywide', '2026-07-30'),
(2, 'Composting Program', 'Set up compost bins for 50 households.', 'Northside District', '2026-08-14'),
(2, 'Farmers Market Support', 'Help local farmers set up stalls and sell produce.', 'Town Square', '2026-08-03'),
(3, 'Food Bank Distribution', 'Sort and distribute food packages to 300 families.', 'Unity Center', '2026-08-18'),
(3, 'Senior Visit Program', 'Volunteers visit seniors weekly for companionship.', 'Sunset Retirement Home', '2026-08-01'),
(3, 'Backpack Drive', 'Collect and pack school supplies for 500 children.', 'UnityServe Office', '2026-07-25'),
(3, 'Blood Donation Camp', 'Host a community blood donation event.', 'City Hospital', '2026-08-11'),
(3, 'Winter Clothing Drive', 'Collect and distribute warm clothing to homeless.', 'Downtown Shelter', '2026-08-20');