'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addToCart(productId: string, quantity: number = 1) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Please login to add items to cart' }
  }

  // Check if item already in cart
  const { data: existingItem } = await supabase
    .from('cart')
    .select('*')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .single()

  if (existingItem) {
    // Update quantity
    const { error } = await supabase
      .from('cart')
      .update({ 
        quantity: existingItem.quantity + quantity,
        updated_at: new Date().toISOString()
      })
      .eq('id', existingItem.id)

    if (error) {
      return { success: false, error: error.message }
    }
  } else {
    // Add new item
    const { error } = await supabase
      .from('cart')
      .insert({
        user_id: user.id,
        product_id: productId,
        quantity: quantity,
      })

    if (error) {
      return { success: false, error: error.message }
    }
  }

  revalidatePath('/products')
  revalidatePath('/shop')
  return { success: true }
}

export async function addToWishlist(productId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Please login to add items to wishlist' }
  }

  const { error } = await supabase
    .from('wishlist')
    .insert({
      user_id: user.id,
      product_id: productId,
    })

  if (error) {
    // Item might already be in wishlist
    if (error.code === '23505') {
      return { success: false, error: 'Item already in wishlist' }
    }
    return { success: false, error: error.message }
  }

  revalidatePath('/products')
  revalidatePath('/wishlist')
  return { success: true }
}

export async function removeFromWishlist(productId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const { error } = await supabase
    .from('wishlist')
    .delete()
    .eq('user_id', user.id)
    .eq('product_id', productId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/products')
  revalidatePath('/wishlist')
  return { success: true }
}

export async function getWishlistCount() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return 0
  }

  const { count } = await supabase
    .from('wishlist')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  return count || 0
}

export async function getCartCount() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return 0
  }

  const { count } = await supabase
    .from('cart')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  return count || 0
}

