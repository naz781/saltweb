'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 250])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1608039829573-803a9b3d3f0e?w=1920&h=1080&fit=crop"
          alt="Premium Himalayan Salt"
          fill
          priority
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/30" />
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="mx-auto max-w-4xl text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 font-serif text-6xl font-light tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            Nature&apos;s Purest Essence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10 text-xl text-white/90 md:text-2xl"
          >
            Premium Himalayan Salt for Health, Wellness, and Culinary Excellence
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/products"
              className="inline-block rounded-lg bg-[#CE978C] px-10 py-4 font-sans text-lg font-medium text-white transition-all hover:bg-[#B8857A] hover:shadow-lg"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

