# Admin Setup Instructions

## Creating an Admin User

### Option 1: Through Supabase Dashboard

1. Go to your Supabase Dashboard → Authentication → Users
2. Click "Add User" or "Invite User"
3. Create a user with:
   - Email: `admin@puresalt.com` (or your preferred email)
   - Password: `Admin123!` (or your preferred password)
4. Copy the user's ID from the users table
5. Go to SQL Editor and run:

```sql
-- Update existing profile
UPDATE public.profiles 
SET role = 'admin', is_admin = true 
WHERE id = 'USER_ID_HERE';

-- OR create new profile if it doesn't exist
INSERT INTO public.profiles (id, email, full_name, role, is_admin)
VALUES ('USER_ID_HERE', 'admin@puresalt.com', 'Admin User', 'admin', true);
```

### Option 2: Through Registration + SQL Update

1. Register a new account through `/register` page
2. Note the email you used
3. Go to Supabase SQL Editor and run:

```sql
UPDATE public.profiles 
SET role = 'admin', is_admin = true 
WHERE email = 'your-email@example.com';
```

## Default Admin Credentials

**Email:** admin@puresalt.com  
**Password:** Admin123!

*(Change these after first login for security!)*

## Admin Features

Once logged in as admin, you can access:

- **Dashboard:** `/admin` - Overview of orders, products, and ads
- **Inventory Management:** `/admin/inventory` - Add, edit, and manage products
- **Orders Management:** `/admin/orders` - View and update order statuses
- **Advertisements:** `/admin/advertisements` - Manage site advertisements
- **Invoices:** `/admin/invoices` - Generate PDF invoices for orders

## Buyer Account

Buyers can access their account at `/account` to:
- View all their orders
- Check order status
- See order details and items

## Database Setup

Make sure to run the migration file:
`supabase/migrations/create_admin_tables.sql`

This creates:
- `orders` table
- `order_items` table
- `advertisements` table
- `invoices` table
- Adds `stock_quantity`, `is_active`, and `category` columns to `products` table

