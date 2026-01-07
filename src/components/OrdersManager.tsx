'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { updateOrderStatus } from '@/app/actions/admin'

interface Order {
  id: string
  status: string
  total_amount: number
  shipping_address: string
  created_at: string
  profiles?: {
    full_name?: string
    email?: string
  }
  order_items?: Array<{
    id: string
    quantity: number
    price: number
    products?: {
      name: string
    }
  }>
}

interface OrdersManagerProps {
  orders: Order[]
}

export default function OrdersManager({ orders: initialOrders }: OrdersManagerProps) {
  const [orders, setOrders] = useState(initialOrders)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    const result = await updateOrderStatus(orderId, newStatus)
    if (result.success) {
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ))
    }
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-4xl font-light text-slate-800 md:text-5xl">
          Orders Management
        </h1>
        <Link
          href="/admin"
          className="rounded-lg bg-slate-600 px-6 py-2 text-white transition-colors hover:bg-slate-700"
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-[#EAE9E3]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Items</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {order.id.substring(0, 8)}...
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {order.profiles?.full_name || order.profiles?.email || 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {order.order_items?.length || 0} item(s)
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-800">
                  ${Number(order.total_amount).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span className={`rounded-lg px-3 py-1 text-xs font-medium ${statusColors[order.status] || 'bg-slate-100 text-slate-800'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                      className="rounded-lg border border-slate-300 px-3 py-1 text-sm focus:border-[#CE978C] focus:outline-none focus:ring-2 focus:ring-[#CE978C]"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="rounded-lg bg-[#CE978C] px-4 py-1 text-sm text-white transition-colors hover:bg-[#B8857A]"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-light text-slate-800">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-600 hover:text-slate-800"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <strong>Order ID:</strong> {selectedOrder.id}
              </div>
              <div>
                <strong>Customer:</strong> {selectedOrder.profiles?.full_name || selectedOrder.profiles?.email}
              </div>
              <div>
                <strong>Shipping Address:</strong> {selectedOrder.shipping_address}
              </div>
              <div>
                <strong>Total Amount:</strong> ${Number(selectedOrder.total_amount).toFixed(2)}
              </div>
              <div>
                <strong>Status:</strong> {selectedOrder.status}
              </div>
              <div>
                <strong>Items:</strong>
                <ul className="mt-2 list-disc pl-6">
                  {selectedOrder.order_items?.map((item) => (
                    <li key={item.id}>
                      {item.products?.name} - Qty: {item.quantity} - ${Number(item.price).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

