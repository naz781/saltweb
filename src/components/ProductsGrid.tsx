'use client'

import AnimatedSection from '@/components/AnimatedSection'
import ProductCard from '@/components/ProductCard'

interface Product {
  id: string
  name: string
  description?: string | null
  price?: number | null
  image_url?: string | null
  stock_quantity?: number | null
  is_active?: boolean | null
  category?: string | null
  created_at?: string
  [key: string]: unknown
}

interface ProductsGridProps {
  products: Product[]
  wishlistItems?: string[]
}

export default function ProductsGrid({ products, wishlistItems = [] }: ProductsGridProps) {
  const wishlistSet = new Set(wishlistItems)

  return (
    <AnimatedSection className="bg-[#FAF8F5] px-4 py-20">
      <div className="mx-auto max-w-7xl">
        {products.length === 0 ? (
          <div className="rounded-lg bg-white p-12 text-center shadow-sm">
            <p className="text-lg text-slate-600">
              No products found. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isInWishlist={wishlistSet.has(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </AnimatedSection>
  )
}

