'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { updateProduct, createProduct } from '@/app/actions/admin'

interface Product {
  id: string
  name: string
  description?: string | null
  price?: number | null
  image_url?: string | null
  stock_quantity?: number | null
  is_active?: boolean | null
  category?: string | null
}

interface InventoryManagerProps {
  products: Product[]
}

export default function InventoryManager({ products: initialProducts }: InventoryManagerProps) {
  const [products, setProducts] = useState(initialProducts)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    stock_quantity: '',
    category: '',
    is_active: true,
  })

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name || '',
      description: product.description || '',
      price: product.price?.toString() || '',
      image_url: product.image_url || '',
      stock_quantity: product.stock_quantity?.toString() || '0',
      category: product.category || '',
      is_active: product.is_active ?? true,
    })
    setShowAddForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingProduct) {
      const result = await updateProduct(editingProduct.id, formData)
      if (result.success) {
        setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p))
        setEditingProduct(null)
        setShowAddForm(false)
        setFormData({
          name: '',
          description: '',
          price: '',
          image_url: '',
          stock_quantity: '',
          category: '',
          is_active: true,
        })
      }
    } else {
      const result = await createProduct(formData)
      if (result.success && result.product) {
        setProducts([result.product, ...products])
        setShowAddForm(false)
        setFormData({
          name: '',
          description: '',
          price: '',
          image_url: '',
          stock_quantity: '',
          category: '',
          is_active: true,
        })
      }
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-4xl font-light text-slate-800 md:text-5xl">
          Inventory Management
        </h1>
        <div className="flex gap-4">
          <Link
            href="/admin"
            className="rounded-lg bg-slate-600 px-6 py-2 text-white transition-colors hover:bg-slate-700"
          >
            Back to Dashboard
          </Link>
          <button
            onClick={() => {
              setEditingProduct(null)
              setShowAddForm(true)
              setFormData({
                name: '',
                description: '',
                price: '',
                image_url: '',
                stock_quantity: '',
                category: '',
                is_active: true,
              })
            }}
            className="rounded-lg bg-[#CE978C] px-6 py-2 text-white transition-colors hover:bg-[#B8857A]"
          >
            Add New Product
          </button>
        </div>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-lg bg-white p-6 shadow-sm"
        >
          <h2 className="mb-4 font-serif text-2xl font-light text-slate-800">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-2 focus:ring-[#CE978C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-2 focus:ring-[#CE978C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  required
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-2 focus:ring-[#CE978C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-2 focus:ring-[#CE978C]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-2 focus:ring-[#CE978C]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-2 focus:ring-[#CE978C]"
                />
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="rounded border-slate-300"
                  />
                  <span className="text-sm text-slate-700">Active</span>
                </label>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="rounded-lg bg-[#CE978C] px-6 py-2 text-white transition-colors hover:bg-[#B8857A]"
              >
                {editingProduct ? 'Update Product' : 'Create Product'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false)
                  setEditingProduct(null)
                }}
                className="rounded-lg bg-slate-300 px-6 py-2 text-slate-700 transition-colors hover:bg-slate-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-lg bg-white shadow-sm"
          >
            {product.image_url ? (
              <div className="relative h-48 w-full">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center bg-slate-100">
                <span className="text-4xl">📦</span>
              </div>
            )}
            <div className="p-6">
              <h3 className="mb-2 text-xl font-semibold text-slate-800">{product.name}</h3>
              <p className="mb-2 text-sm text-slate-600">${Number(product.price || 0).toFixed(2)}</p>
              <p className="mb-2 text-sm text-slate-600">
                Stock: <span className="font-medium">{product.stock_quantity || 0}</span>
              </p>
              <p className="mb-4 text-sm text-slate-600">
                Status: <span className={`font-medium ${product.is_active ? 'text-green-600' : 'text-red-600'}`}>
                  {product.is_active ? 'Active' : 'Inactive'}
                </span>
              </p>
              <button
                onClick={() => handleEdit(product)}
                className="w-full rounded-lg bg-[#CE978C] px-4 py-2 text-sm text-white transition-colors hover:bg-[#B8857A]"
              >
                Edit Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

