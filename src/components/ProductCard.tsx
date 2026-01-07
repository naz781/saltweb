'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { addToCart, addToWishlist, removeFromWishlist } from '@/app/actions/cart-wishlist'

interface Product {
  id: string
  name: string
  description?: string | null
  price?: number | null
  image_url?: string | null
  stock_quantity?: number | null
  is_active?: boolean | null
}

interface ProductCardProps {
  product: Product
  index?: number
  isInWishlist?: boolean
}

export default function ProductCard({ product, index = 0, isInWishlist: initialIsInWishlist = false }: ProductCardProps) {
  const [isInWishlist, setIsInWishlist] = useState(initialIsInWishlist)
  const [isAdding, setIsAdding] = useState(false)
  const [isWishlisting, setIsWishlisting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleAddToCart = async () => {
    setIsAdding(true)
    setMessage(null)
    const result = await addToCart(product.id, 1)
    if (result.success) {
      setMessage('Added to cart!')
      setTimeout(() => setMessage(null), 2000)
      // Refresh navbar counts
      window.dispatchEvent(new Event('cart-updated'))
    } else {
      setMessage(result.error || 'Failed to add to cart')
      setTimeout(() => setMessage(null), 3000)
    }
    setIsAdding(false)
  }

  const handleWishlist = async () => {
    setIsWishlisting(true)
    setMessage(null)
    
    if (isInWishlist) {
      const result = await removeFromWishlist(product.id)
      if (result.success) {
        setIsInWishlist(false)
        setMessage('Removed from wishlist')
        window.dispatchEvent(new Event('wishlist-updated'))
      } else {
        setMessage(result.error || 'Failed to remove')
      }
    } else {
      const result = await addToWishlist(product.id)
      if (result.success) {
        setIsInWishlist(true)
        setMessage('Added to wishlist!')
        window.dispatchEvent(new Event('wishlist-updated'))
      } else {
        setMessage(result.error || 'Failed to add')
      }
    }
    
    setTimeout(() => setMessage(null), 2000)
    setIsWishlisting(false)
  }

  const isOutOfStock = (product.stock_quantity || 0) <= 0 || !product.is_active

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-lg"
    >
      <div className="relative h-64 w-full overflow-hidden bg-slate-100">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name || 'Product image'}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-6xl">🧂</span>
          </div>
        )}
        <button
          onClick={handleWishlist}
          disabled={isWishlisting}
          className={`absolute top-3 right-3 rounded-full p-2 transition-colors ${
            isInWishlist
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-white/90 text-slate-600 hover:bg-white hover:text-red-500'
          }`}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg
            className="h-5 w-5"
            fill={isInWishlist ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h2 className="mb-2 text-xl font-semibold text-slate-900">
          {product.name || 'Unnamed Product'}
        </h2>

        {product.description && (
          <p className="mb-4 line-clamp-2 text-sm text-slate-600">
            {product.description}
          </p>
        )}

        <div className="mb-4 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-slate-900">
              ${Number(product.price || 0).toFixed(2)}
            </span>
            {product.stock_quantity !== null && product.stock_quantity !== undefined && (
              <p className="text-xs text-slate-500">
                {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
              </p>
            )}
          </div>
        </div>

        {message && (
          <div className={`mb-3 rounded-lg p-2 text-xs ${
            message.includes('Added') || message.includes('Removed')
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        )}

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={isAdding || isOutOfStock}
            className="flex-1 rounded-lg bg-[#CE978C] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#B8857A] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isAdding ? 'Adding...' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

