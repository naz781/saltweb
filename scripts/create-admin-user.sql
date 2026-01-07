-- Run this SQL in your Supabase SQL Editor to create an admin user
-- Replace 'admin@puresalt.com' and 'Admin123!' with your desired email and password

-- First, create the user in auth.users (you'll need to do this through Supabase Auth UI or API)
-- Then run this to set them as admin:

-- After creating the user through Supabase Auth, get their user ID and run:
-- UPDATE public.profiles 
-- SET role = 'admin', is_admin = true 
-- WHERE email = 'admin@puresalt.com';

-- OR if the profile doesn't exist yet:
-- INSERT INTO public.profiles (id, email, full_name, role, is_admin)
-- SELECT id, email, 'Admin User', 'admin', true
-- FROM auth.users
-- WHERE email = 'admin@puresalt.com';

