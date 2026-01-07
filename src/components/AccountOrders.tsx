'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface Order {
  id: string
  status: string
  total_amount: number
  shipping_address: string
  created_at: string
  order_items?: Array<{
    id: string
    quantity: number
    price: number
    products?: {
      name: string
      price: number
      image_url?: string | null
    }
  }>
}

interface AccountOrdersProps {
  orders: Order[]
}

export default function AccountOrders({ orders }: AccountOrdersProps) {
  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-8 font-serif text-4xl font-light text-slate-800 md:text-5xl">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="rounded-lg bg-white p-12 text-center shadow-sm">
          <p className="text-lg text-slate-600">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden rounded-lg bg-white shadow-sm"
            >
              <div className="border-b border-slate-200 bg-[#EAE9E3] px-6 py-4">
                <div className="flex flex-col justify-between md:flex-row md:items-center">
                  <div>
                    <p className="text-sm text-slate-600">Order #{order.id.substring(0, 8)}</p>
                    <p className="text-sm text-slate-600">
                      Placed on {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className={`rounded-lg px-3 py-1 text-xs font-medium ${statusColors[order.status] || 'bg-slate-100 text-slate-800'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="mb-2 text-sm font-medium text-slate-700">Shipping Address</h3>
                  <p className="text-sm text-slate-600">{order.shipping_address}</p>
                </div>
                <div className="mb-4">
                  <h3 className="mb-2 text-sm font-medium text-slate-700">Order Items</h3>
                  <div className="space-y-3">
                    {order.order_items?.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        {item.products?.image_url ? (
                          <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                            <Image
                              src={item.products.image_url}
                              alt={item.products.name || 'Product'}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                        ) : (
                          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-slate-100">
                            <span className="text-2xl">📦</span>
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">{item.products?.name}</p>
                          <p className="text-sm text-slate-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-slate-800">
                          ${Number(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-slate-800">Total Amount:</span>
                    <span className="text-lg font-bold text-slate-800">
                      ${Number(order.total_amount).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

