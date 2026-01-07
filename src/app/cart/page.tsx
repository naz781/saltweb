import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/Navbar'
import CartItems from '@/components/CartItems'

async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return null
  }

  return user
}

async function getCart(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('cart')
    .select(`
      *,
      products(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching cart:', error)
    return []
  }

  return data || []
}

export default async function CartPage() {
  const user = await getUser()
  
  if (!user) {
    redirect('/login')
  }

  const cart = await getCart(user.id)

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />
      <CartItems cart={cart} />
    </div>
  )
}

