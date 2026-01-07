'use client'

import { useState } from 'react'
import Link from 'next/link'
import { generateInvoice } from '@/app/actions/invoices'

interface Order {
  id: string
  total_amount: number
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

interface Invoice {
  id: string
  invoice_number: string
  pdf_url?: string | null
  created_at: string
  orders?: Order
}

interface InvoicesManagerProps {
  orders: Order[]
  invoices: Invoice[]
}

export default function InvoicesManager({ orders, invoices }: InvoicesManagerProps) {
  const [isGenerating, setIsGenerating] = useState<string | null>(null)

  const handleGenerateInvoice = async (orderId: string) => {
    setIsGenerating(orderId)
    await generateInvoice(orderId)
    setIsGenerating(null)
    window.location.reload()
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-4xl font-light text-slate-800 md:text-5xl">
          Invoice Management
        </h1>
        <Link
          href="/admin"
          className="rounded-lg bg-slate-600 px-6 py-2 text-white transition-colors hover:bg-slate-700"
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="mb-12">
        <h2 className="mb-4 font-serif text-2xl font-light text-slate-800">Generate New Invoice</h2>
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-[#EAE9E3]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {orders.map((order) => {
                const hasInvoice = invoices.some(inv => inv.orders?.id === order.id)
                return (
                  <tr key={order.id}>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {order.id.substring(0, 8)}...
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {order.profiles?.full_name || order.profiles?.email || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-800">
                      ${Number(order.total_amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {hasInvoice ? (
                        <span className="text-sm text-green-600">Invoice Generated</span>
                      ) : (
                        <button
                          onClick={() => handleGenerateInvoice(order.id)}
                          disabled={isGenerating === order.id}
                          className="rounded-lg bg-[#CE978C] px-4 py-2 text-sm text-white transition-colors hover:bg-[#B8857A] disabled:opacity-50"
                        >
                          {isGenerating === order.id ? 'Generating...' : 'Generate PDF'}
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="mb-4 font-serif text-2xl font-light text-slate-800">Generated Invoices</h2>
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-[#EAE9E3]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Invoice Number</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Order ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">
                    {invoice.invoice_number}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {invoice.orders?.id.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {invoice.orders?.profiles?.full_name || invoice.orders?.profiles?.email || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(invoice.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {invoice.pdf_url ? (
                      <a
                        href={invoice.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-[#CE978C] px-4 py-2 text-sm text-white transition-colors hover:bg-[#B8857A]"
                      >
                        View PDF
                      </a>
                    ) : (
                      <span className="text-sm text-slate-500">PDF not available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

