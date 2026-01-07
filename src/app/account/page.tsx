import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/Navbar'
import AccountOrders from '@/components/AccountOrders'

async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return null
  }

  return user
}

async function getOrders(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items(
        *,
        products(name, price, image_url)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error)
    return []
  }

  return data || []
}

export default async function AccountPage() {
  const user = await getUser()
  
  if (!user) {
    redirect('/login')
  }

  const orders = await getOrders(user.id)

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />
      <AccountOrders orders={orders} />
    </div>
  )
}

