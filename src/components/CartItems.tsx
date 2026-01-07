'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'

interface CartItem {
  id: string
  product_id: string
  quantity: number
  products: {
    id: string
    name: string
    description?: string | null
    price?: number | null
    image_url?: string | null
    stock_quantity?: number | null
  }
}

interface CartItemsProps {
  cart: CartItem[]
}

export default function CartItems({ cart: initialCart }: CartItemsProps) {
  const [cart, setCart] = useState(initialCart)
  const [updating, setUpdating] = useState<string | null>(null)

  const updateQuantity = async (cartId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeItem(cartId)
      return
    }

    setUpdating(cartId)
    const supabase = createClient()
    const { error } = await supabase
      .from('cart')
      .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
      .eq('id', cartId)

    if (!error) {
      setCart(cart.map(item => 
        item.id === cartId ? { ...item, quantity: newQuantity } : item
      ))
    }
    setUpdating(null)
  }

  const removeItem = async (cartId: string) => {
    setUpdating(cartId)
    const supabase = createClient()
    const { error } = await supabase
      .from('cart')
      .delete()
      .eq('id', cartId)

    if (!error) {
      setCart(cart.filter(item => item.id !== cartId))
    }
    setUpdating(null)
  }

  const total = cart.reduce((sum, item) => {
    return sum + (Number(item.products.price || 0) * item.quantity)
  }, 0)

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="rounded-lg bg-white p-12 text-center shadow-sm">
          <div className="mb-4 text-6xl">🛒</div>
          <h2 className="mb-2 font-serif text-2xl font-light text-slate-800">
            Your Cart is Empty
          </h2>
          <p className="mb-6 text-slate-600">
            Add some premium Himalayan salt products to your cart!
          </p>
          <Link
            href="/products"
            className="inline-block rounded-lg bg-[#CE978C] px-6 py-3 text-white transition-colors hover:bg-[#B8857A]"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-20">
      <h1 className="mb-8 font-serif text-4xl font-light text-slate-800 md:text-5xl">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const product = item.products
            const itemTotal = Number(product.price || 0) * item.quantity

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 rounded-lg bg-white p-6 shadow-sm"
              >
                {product.image_url ? (
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={product.image_url}
                      alt={product.name || 'Product'}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                ) : (
                  <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <span className="text-3xl">🧂</span>
                  </div>
                )}

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-600">
                      ${Number(product.price || 0).toFixed(2)} each
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={updating === item.id}
                        className="rounded-lg border border-slate-300 px-3 py-1 text-sm disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={updating === item.id || (product.stock_quantity !== null && item.quantity >= (product.stock_quantity || 0))}
                        className="rounded-lg border border-slate-300 px-3 py-1 text-sm disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-slate-800">
                        ${itemTotal.toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={updating === item.id}
                        className="text-red-500 hover:text-red-700 disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-serif text-2xl font-light text-slate-800">
              Order Summary
            </h2>
            <div className="space-y-3 border-b border-slate-200 pb-4">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <div className="mt-4 flex justify-between text-xl font-bold text-slate-800">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-lg bg-[#CE978C] px-6 py-3 text-center font-medium text-white transition-colors hover:bg-[#B8857A]"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

