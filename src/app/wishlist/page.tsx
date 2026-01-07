import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/Navbar'
import WishlistGrid from '@/components/WishlistGrid'

async function getUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return null
  }

  return user
}

async function getWishlist(userId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('wishlist')
    .select(`
      *,
      products(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching wishlist:', error)
    return []
  }

  return data || []
}

export default async function WishlistPage() {
  const user = await getUser()
  
  if (!user) {
    redirect('/login')
  }

  const wishlist = await getWishlist(user.id)

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />
      <WishlistGrid wishlist={wishlist} />
    </div>
  )
}

