-- ============================================
-- DROP TABLES IF THEY EXIST - so we can re-run this file
-- ============================================
DROP TABLE IF EXISTS public.service_projects CASCADE;
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

-- Insert 3 sample organizations
INSERT INTO public.organizations (name, description, contact_email, logo_filename) 
VALUES 
('BrightFuture Builders', 
 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 
 'info@brightfuturebuilders.org', 
 'brightfuture-logo.png'),

('GreenHarvest Growers', 
 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 
 'contact@greenharvest.org', 
 'greenharvest-logo.png'),

('UnityServe Volunteers', 
 'A volunteer coordination group supporting local charities and service initiatives.', 
 'hello@unityserve.org', 
 'unityserve-logo.png');

-- ============================================
-- 2. SERVICE PROJECTS TABLE
-- ============================================
CREATE TABLE public.service_projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES public.organizations(organization_id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(200) NOT NULL,
    project_date DATE NOT NULL
);

-- Insert 5 projects for each organization = 15 total
-- Because we just inserted orgs, their IDs will be 1, 2, 3
INSERT INTO public.service_projects (organization_id, title, description, location, project_date) VALUES
-- BrightFuture Builders - ID 1
(1, 'Build Community Center', 'Volunteers will help build a new community center for after-school programs.', 'Downtown Harare', '2026-05-15'),
(1, 'Home Renovation Drive', 'Renovate 10 homes for elderly residents.', 'Eastview Suburb', '2026-06-02'),
(1, 'Park Cleanup & Build', 'Clean up city park and install new benches and playground equipment.', 'Central Park', '2026-06-20'),
(1, 'School Repairs', 'Paint classrooms and fix desks at Riverside Primary.', 'Riverside Primary', '2026-07-10'),
(1, 'Disaster Relief Housing', 'Build emergency shelters for families affected by floods.', 'Mbare Community', '2026-08-01'),

-- GreenHarvest Growers - ID 2
(2, 'Community Garden Setup', 'Start a community garden to provide fresh produce to local families.', 'Greenfield Lot 12', '2026-04-22'),
(2, 'Urban Farming Workshop', 'Teach residents how to grow vegetables in small spaces.', 'Community Hall', '2026-05-05'),
(2, 'Tree Planting Initiative', 'Plant 200 fruit trees around the city.', 'Citywide', '2026-05-30'),
(2, 'Composting Program', 'Set up compost bins for 50 households.', 'Northside District', '2026-06-14'),
(2, 'Farmers Market Support', 'Help local farmers set up stalls and sell produce.', 'Town Square', '2026-07-03'),

-- UnityServe Volunteers - ID 3
(3, 'Food Bank Distribution', 'Sort and distribute food packages to 300 families.', 'Unity Center', '2026-04-18'),
(3, 'Senior Visit Program', 'Volunteers visit seniors weekly for companionship.', 'Sunset Retirement Home', '2026-05-01'),
(3, 'Backpack Drive', 'Collect and pack school supplies for 500 children.', 'UnityServe Office', '2026-05-25'),
(3, 'Blood Donation Camp', 'Host a community blood donation event.', 'City Hospital', '2026-06-11'),
(3, 'Winter Clothing Drive', 'Collect and distribute warm clothing to homeless.', 'Downtown Shelter', '2026-07-20');

-- ============================================
-- 3. VERIFICATION QUERIES
-- ============================================
SELECT 'Organizations:' AS table_name;
SELECT * FROM public.organizations;

SELECT 'Service Projects:' AS table_name;
SELECT p.project_id, p.title, p.project_date, o.name AS organization_name 
FROM public.service_projects p
JOIN public.organizations o ON p.organization_id = o.organization_id
ORDER BY p.project_date;