'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

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

export async function updateProduct(productId: string, data: {
  name: string
  description: string
  price: string
  image_url: string
  stock_quantity: string
  category: string
  is_active: boolean
}) {
  if (!(await checkAdmin())) {
    return { success: false, error: 'Unauthorized' }
  }

  const supabase = await createClient()
  
  const { error } = await supabase
    .from('products')
    .update({
      name: data.name,
      description: data.description || null,
      price: parseFloat(data.price),
      image_url: data.image_url || null,
      stock_quantity: parseInt(data.stock_quantity),
      category: data.category || null,
      is_active: data.is_active,
    })
    .eq('id', productId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/inventory')
  return { success: true }
}

export async function createProduct(data: {
  name: string
  description: string
  price: string
  image_url: string
  stock_quantity: string
  category: string
  is_active: boolean
}) {
  if (!(await checkAdmin())) {
    return { success: false, error: 'Unauthorized' }
  }

  const supabase = await createClient()
  
  const { data: product, error } = await supabase
    .from('products')
    .insert({
      name: data.name,
      description: data.description || null,
      price: parseFloat(data.price),
      image_url: data.image_url || null,
      stock_quantity: parseInt(data.stock_quantity),
      category: data.category || null,
      is_active: data.is_active,
    })
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/inventory')
  return { success: true, product }
}

export async function updateOrderStatus(orderId: string, status: string) {
  if (!(await checkAdmin())) {
    return { success: false, error: 'Unauthorized' }
  }

  const supabase = await createClient()
  
  const { error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/orders')
  return { success: true }
}

