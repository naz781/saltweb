# Database Setup Instructions

## Running the Migration

The SQL migration file `supabase/migrations/create_admin_tables.sql` **cannot be run in the terminal/bash**. It must be executed in your Supabase SQL Editor.

### Steps to Run the Migration:

1. **Go to your Supabase Dashboard**
   - Visit https://app.supabase.com
   - Select your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy and Paste the SQL**
   - Open `supabase/migrations/create_admin_tables.sql` in your code editor
   - Copy ALL the contents
   - Paste into the Supabase SQL Editor

4. **Run the Query**
   - Click "Run" or press Ctrl+Enter (Windows) / Cmd+Enter (Mac)
   - Wait for the success message

### What This Migration Creates:

- ✅ `orders` table - Stores customer orders
- ✅ `order_items` table - Stores items in each order
- ✅ `advertisements` table - Stores site advertisements
- ✅ `invoices` table - Stores generated invoices
- ✅ Adds columns to `products` table:
  - `stock_quantity` - Inventory count
  - `is_active` - Product active status
  - `category` - Product category
- ✅ Row Level Security (RLS) policies
- ✅ Function to generate invoice numbers

### Alternative: Using Supabase CLI

If you have Supabase CLI installed locally:

```bash
# Make sure you're logged in
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Run the migration
supabase db push
```

But the easiest way is through the Supabase Dashboard SQL Editor!

