import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ProductsGrid from '@/components/ProductsGrid'

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

async function getProducts() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return (data as Product[]) || []
}

async function getWishlistItems() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return []
  }

  const { data } = await supabase
    .from('wishlist')
    .select('product_id')
    .eq('user_id', user.id)

  return data?.map(item => item.product_id) || []
}

export default async function ProductsPage() {
  const products = await getProducts()
  const wishlistItems = await getWishlistItems()

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden bg-gradient-to-br from-[#CE978C] to-[#B8857A]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mx-auto max-w-4xl text-center px-4">
            <h1 className="mb-6 font-serif text-5xl font-light tracking-tight text-white md:text-6xl lg:text-7xl">
              Our Products
            </h1>
            <p className="text-xl text-white/90 md:text-2xl">
              Discover our complete collection of premium Himalayan salt products
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <ProductsGrid products={products} wishlistItems={wishlistItems} />

      {/* Features Section */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 text-5xl">✨</div>
              <h3 className="mb-3 font-serif text-2xl font-light text-slate-800">
                Premium Quality
              </h3>
              <p className="text-slate-600">
                Every product is carefully selected and tested to meet our uncompromising standards for purity.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-5xl">🌿</div>
              <h3 className="mb-3 font-serif text-2xl font-light text-slate-800">
                Natural & Pure
              </h3>
              <p className="text-slate-600">
                Sourced directly from Himalayan mines, containing 84 essential trace minerals.
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-5xl">🚚</div>
              <h3 className="mb-3 font-serif text-2xl font-light text-slate-800">
                Fast Shipping
              </h3>
              <p className="text-slate-600">
                We deliver your products quickly and safely, ensuring freshness and quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#EAE9E3] px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-serif text-4xl font-light text-slate-800 md:text-5xl">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="mb-8 text-lg text-slate-600">
            Contact us and we&apos;ll help you find the perfect Himalayan salt product for your needs.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-[#CE978C] px-10 py-4 font-sans text-lg font-medium text-white transition-all hover:bg-[#B8857A] hover:shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#EAE9E3] px-4 py-16 text-slate-800">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <h3 className="mb-4 font-serif text-2xl font-light text-slate-800">Stay Connected</h3>
              <p className="mb-4 text-slate-600">
                Subscribe to receive updates on new products and wellness tips.
              </p>
              <form className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-[#CE978C] focus:outline-none focus:ring-2 focus:ring-[#CE978C]"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#CE978C] px-6 py-3 font-medium text-white transition-colors hover:bg-[#B8857A]"
                >
                  Subscribe
                </button>
              </form>
            </div>
            <div>
              <h3 className="mb-4 font-serif text-2xl font-light text-slate-800">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/products" className="text-slate-600 transition-colors hover:text-[#CE978C]">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-slate-600 transition-colors hover:text-[#CE978C]">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-slate-600 transition-colors hover:text-[#CE978C]">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-serif text-2xl font-light text-slate-800">About Us</h3>
              <p className="text-slate-600">
                Dedicated to bringing you the finest Himalayan salt products 
                for your health, wellness, and culinary journey.
              </p>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-300 pt-8 text-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} PureSalt. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
