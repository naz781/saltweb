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

export async function generateInvoice(orderId: string) {
  if (!(await checkAdmin())) {
    return { success: false, error: 'Unauthorized' }
  }

  const supabase = await createClient()
  
  // Get order details
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select(`
      *,
      profiles(full_name, email),
      order_items(
        *,
        products(name, price)
      )
    `)
    .eq('id', orderId)
    .single()

  if (orderError || !order) {
    return { success: false, error: 'Order not found' }
  }

  // Generate invoice number
  const { data: invoiceNumber } = await supabase.rpc('generate_invoice_number')

  // Create invoice record
  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .insert({
      order_id: orderId,
      invoice_number: invoiceNumber || `INV-${Date.now()}`,
    })
    .select()
    .single()

  if (invoiceError) {
    return { success: false, error: invoiceError.message }
  }

  // For now, we'll just create the invoice record
  // PDF generation would require a PDF library like pdfkit or jsPDF
  // You can integrate that later

  revalidatePath('/admin/invoices')
  return { success: true, invoice }
}

