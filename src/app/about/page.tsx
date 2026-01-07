'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import AnimatedCard from '@/components/AnimatedCard'
import AnimatedSection from '@/components/AnimatedSection'

export default function AboutPage() {
  const healthCards = [
    {
      title: 'Pure Quality',
      description: 'Sourced directly from Himalayan mines, ensuring the highest purity standards.',
      icon: '✨',
    },
    {
      title: 'Natural Minerals',
      description: '84 essential trace minerals preserved for over 250 million years.',
      icon: '🌿',
    },
    {
      title: 'Sustainable',
      description: 'Ethically sourced with respect for nature and local communities.',
      icon: '🌍',
    },
  ]

  const values = [
    {
      title: 'Our Mission',
      text: 'To bring the purest Himalayan salt to your table, supporting your journey towards natural wellness and culinary excellence. We believe in the power of nature\'s gifts and their ability to transform everyday experiences.',
    },
    {
      title: 'Our Vision',
      text: 'To become the trusted source for premium Himalayan salt products worldwide, while maintaining our commitment to quality, sustainability, and the well-being of our customers and the communities we serve.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      {/* Hero Section with Text Box */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1608039829573-803a9b3d3f0e?w=1920&h=1080&fit=crop"
          alt="About Us - Himalayan Salt"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl w-full px-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-2xl"
            >
              <div className="bg-white/85 backdrop-blur-sm rounded-lg p-8 md:p-12 shadow-xl">
                <h1 className="mb-6 font-serif text-5xl font-light tracking-tight text-slate-800 md:text-6xl lg:text-7xl">
                  About PureSalt
                </h1>
                <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
                  Discover the story behind our commitment to bringing you nature&apos;s purest 
                  Himalayan salt, mined from ancient sea beds and delivered with care to your home.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Welcome to Pink Pantry Section */}
      <AnimatedSection className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-96 overflow-hidden rounded-lg lg:h-[500px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1584735175097-719d848f8449?w=800&h=800&fit=crop"
                alt="Pink Pantry"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="font-serif text-4xl font-light text-slate-800 md:text-5xl">
                Welcome to Pink Pantry
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                At Pink Pantry, we&apos;re passionate about bringing you the finest Himalayan salt 
                products. Our journey began with a simple belief: that nature provides the best 
                solutions for health and wellness.
              </p>
              <p className="text-lg leading-relaxed text-slate-600">
                Every product in our collection is carefully selected and tested to meet our 
                uncompromising standards for purity and quality. We work directly with trusted 
                suppliers in the Himalayan region to ensure authenticity and traceability.
              </p>
              <p className="text-lg leading-relaxed text-slate-600">
                From fine grain salt for your kitchen to luxurious bath salts for your wellness 
                routine, Pink Pantry offers a complete range of Himalayan salt products to enhance 
                your daily life.
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Building Healthier Tomorrow with Three Cards */}
      <AnimatedSection className="bg-[#EAE9E3] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center font-serif text-4xl font-light text-slate-800 md:text-5xl"
          >
            Building Healthier Tomorrow
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {healthCards.map((card, index) => (
              <AnimatedCard key={index} index={index}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-lg bg-white p-8 shadow-sm text-center"
                >
                  <div className="mb-4 text-5xl">{card.icon}</div>
                  <h3 className="mb-4 font-serif text-2xl font-light text-slate-800">
                    {card.title}
                  </h3>
                  <p className="text-slate-600">{card.description}</p>
                </motion.div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Image in Middle with Two Text Sections on Both Sides */}
      <AnimatedSection className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:items-center">
            {/* Left Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="font-serif text-3xl font-light text-slate-800">
                {values[0].title}
              </h3>
              <p className="text-lg leading-relaxed text-slate-600">
                {values[0].text}
              </p>
            </motion.div>

            {/* Center Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-96 overflow-hidden rounded-lg lg:h-[500px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1608039829573-803a9b3d3f0e?w=1000&h=1000&fit=crop"
                alt="Himalayan Salt"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </motion.div>

            {/* Right Text */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="font-serif text-3xl font-light text-slate-800">
                {values[1].title}
              </h3>
              <p className="text-lg leading-relaxed text-slate-600">
                {values[1].text}
              </p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="bg-[#EAE9E3] px-4 py-16 text-slate-800">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Newsletter */}
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

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 font-serif text-2xl font-light text-slate-800">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/products"
                    className="text-slate-600 transition-colors hover:text-[#CE978C]"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-slate-600 transition-colors hover:text-[#CE978C]"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-slate-600 transition-colors hover:text-[#CE978C]"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Info */}
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

