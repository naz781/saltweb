import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/Navbar'
import InventoryManager from '@/components/InventoryManager'

async function checkAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return false
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_admin')
    .eq('id', user.id)
    .single()

  return profile && (profile.role === 'admin' || profile.is_admin === true)
}

async function getProducts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data || []
}

export default async function InventoryPage() {
  const isAdmin = await checkAdmin()
  
  if (!isAdmin) {
    redirect('/login')
  }

  const products = await getProducts()

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />
      <InventoryManager products={products} />
    </div>
  )
}

