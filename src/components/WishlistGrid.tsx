'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { removeFromWishlist, addToCart } from '@/app/actions/cart-wishlist'

interface WishlistItem {
  id: string
  product_id: string
  products: {
    id: string
    name: string
    description?: string | null
    price?: number | null
    image_url?: string | null
    stock_quantity?: number | null
    is_active?: boolean | null
  }
}

interface WishlistGridProps {
  wishlist: WishlistItem[]
}

export default function WishlistGrid({ wishlist: initialWishlist }: WishlistGridProps) {
  const [wishlist, setWishlist] = useState(initialWishlist)
  const [removing, setRemoving] = useState<string | null>(null)
  const [adding, setAdding] = useState<string | null>(null)

  const handleRemove = async (productId: string) => {
    setRemoving(productId)
    const result = await removeFromWishlist(productId)
    if (result.success) {
      setWishlist(wishlist.filter(item => item.product_id !== productId))
    }
    setRemoving(null)
  }

  const handleAddToCart = async (productId: string) => {
    setAdding(productId)
    await addToCart(productId, 1)
    setAdding(null)
  }

  if (wishlist.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="rounded-lg bg-white p-12 text-center shadow-sm">
          <div className="mb-4 text-6xl">💔</div>
          <h2 className="mb-2 font-serif text-2xl font-light text-slate-800">
            Your Wishlist is Empty
          </h2>
          <p className="mb-6 text-slate-600">
            Start adding products you love to your wishlist!
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
        My Wishlist
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist.map((item, index) => {
          const product = item.products
          const isOutOfStock = (product.stock_quantity || 0) <= 0 || !product.is_active

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
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
                  onClick={() => handleRemove(product.id)}
                  disabled={removing === product.id}
                  className="absolute top-3 right-3 rounded-full bg-red-500 p-2 text-white transition-colors hover:bg-red-600 disabled:opacity-50"
                  aria-label="Remove from wishlist"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
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

                <div className="mb-4">
                  <span className="text-2xl font-bold text-slate-900">
                    ${Number(product.price || 0).toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddToCart(product.id)}
                    disabled={adding === product.id || isOutOfStock}
                    className="flex-1 rounded-lg bg-[#CE978C] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#B8857A] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {adding === product.id ? 'Adding...' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

