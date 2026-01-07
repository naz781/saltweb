'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import AnimatedCard from '@/components/AnimatedCard'
import AnimatedSection from '@/components/AnimatedSection'

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: 'The Health Benefits of Himalayan Salt',
      excerpt: 'Discover how Himalayan pink salt can improve your health and wellness with its 84 essential minerals.',
      image: 'https://images.unsplash.com/photo-1608039829573-803a9b3d3f0e?w=800&h=600&fit=crop',
      date: 'March 15, 2024',
      category: 'Wellness',
    },
    {
      id: 2,
      title: 'Cooking with Himalayan Salt: A Chef\'s Guide',
      excerpt: 'Learn professional techniques for using Himalayan salt to elevate your culinary creations.',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop',
      date: 'March 10, 2024',
      category: 'Cooking',
    },
    {
      id: 3,
      title: 'Salt Therapy: Natural Wellness at Home',
      excerpt: 'Everything you need to know about using salt lamps and salt therapy for better air quality and relaxation.',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
      date: 'March 5, 2024',
      category: 'Wellness',
    },
    {
      id: 4,
      title: 'The Science Behind Pink Salt',
      excerpt: 'Understanding the mineral composition and unique properties that make Himalayan salt special.',
      image: 'https://images.unsplash.com/photo-1584735175097-719d848f8449?w=800&h=600&fit=crop',
      date: 'February 28, 2024',
      category: 'Science',
    },
    {
      id: 5,
      title: 'Sustainable Sourcing: Our Commitment',
      excerpt: 'Learn about our ethical sourcing practices and commitment to environmental sustainability.',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=600&fit=crop',
      date: 'February 20, 2024',
      category: 'Sustainability',
    },
    {
      id: 6,
      title: 'Salt Bath Recipes for Relaxation',
      excerpt: 'Discover luxurious salt bath recipes to create a spa-like experience in your own home.',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=600&fit=crop',
      date: 'February 15, 2024',
      category: 'Wellness',
    },
  ]

  const categories = ['All', 'Wellness', 'Cooking', 'Science', 'Sustainability']

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden bg-gradient-to-br from-[#CE978C] to-[#B8857A]">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="mx-auto max-w-4xl text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 font-serif text-5xl font-light tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              Our Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white/90 md:text-2xl"
            >
              Discover insights, tips, and stories about Himalayan salt
            </motion.p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <AnimatedSection className="bg-white px-4 py-8 border-b border-slate-200">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-[#EAE9E3] px-6 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-[#CE978C] hover:text-white"
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Blog Posts Grid */}
      <AnimatedSection className="bg-[#FAF8F5] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post, index) => (
              <AnimatedCard key={post.id} index={index}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-[#CE978C] px-3 py-1 text-xs font-medium text-white">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="mb-2 text-sm text-slate-500">{post.date}</p>
                    <h2 className="mb-3 font-serif text-2xl font-light text-slate-800">
                      {post.title}
                    </h2>
                    <p className="mb-4 line-clamp-3 text-slate-600">{post.excerpt}</p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-block rounded-lg bg-[#CE978C] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#B8857A]"
                      >
                        Read More
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="rounded-lg bg-[#CE978C] px-6 py-3 font-medium text-white transition-colors hover:bg-[#B8857A]"
                >
                  Subscribe
                </motion.button>
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

