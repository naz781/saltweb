'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AnimatedCard from '@/components/AnimatedCard'
import AnimatedSection from '@/components/AnimatedSection'

export default function Home() {
  const offerings = [
    {
      title: 'Fine Grain Salt',
      description: 'Perfect for everyday cooking',
      image: 'https://images.unsplash.com/photo-1608039829573-803a9b3d3f0e?w=800&h=600&fit=crop',
    },
    {
      title: 'Coarse Salt',
      description: 'Ideal for finishing dishes',
      image: 'https://images.unsplash.com/photo-1584735175097-719d848f8449?w=800&h=600&fit=crop',
    },
    {
      title: 'Salt Lamps',
      description: 'Natural air purifiers',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
    },
    {
      title: 'Bath Salts',
      description: 'Luxurious spa experience',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=600&fit=crop',
    },
    {
      title: 'Salt Blocks',
      description: 'Cooking and serving',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop',
    },
    {
      title: 'Salt Crystals',
      description: 'Pure mineral crystals',
      image: 'https://images.unsplash.com/photo-1608039829573-803a9b3d3f0e?w=800&h=600&fit=crop',
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Wellness Enthusiast',
      text: 'The quality is exceptional. I can taste the purity in every grain. This salt has transformed my cooking.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    },
    {
      name: 'Michael Rodriguez',
      role: 'Professional Chef',
      text: 'This salt elevates every dish. A true culinary treasure. My customers notice the difference immediately.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    },
    {
      name: 'Emma Thompson',
      role: 'Health Coach',
      text: 'My clients love it. The health benefits are remarkable. I recommend it to everyone seeking natural wellness.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    },
  ]

  const tips = [
    {
      title: 'Cooking with Himalayan Salt',
      description: 'Learn the best techniques for using pink salt in your kitchen',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop',
    },
    {
      title: 'Wellness Benefits',
      description: 'Discover how Himalayan salt can improve your health',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=400&fit=crop',
    },
    {
      title: 'Salt Therapy Guide',
      description: 'Everything you need to know about salt therapy at home',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop',
    },
  ]

  const certifications = [
    { name: 'Halal Certified', logo: '🕌' },
    { name: 'BRC Certified', logo: '✅' },
    { name: 'Organic', logo: '🌱' },
    { name: 'ISO 9001', logo: '⭐' },
    { name: 'FDA Approved', logo: '🏥' },
  ]

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />

      <HeroSection />

      {/* Discover Our Pure Offerings - 6 Cards */}
      <AnimatedSection className="bg-[#FAF8F5] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center font-serif text-4xl font-light text-slate-800 md:text-5xl"
          >
            Discover Our Pure Offerings
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offerings.map((offering, index) => (
              <AnimatedCard key={index} index={index}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={offering.image}
                      alt={offering.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 font-serif text-2xl font-light text-slate-800">
                      {offering.title}
                    </h3>
                    <p className="text-slate-600">{offering.description}</p>
                  </div>
                </motion.div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Two Grid Section - Salt Image Left, Description Right */}
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
                alt="Himalayan Pink Salt"
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
                Himalayan Pink Salt
              </h2>
              <p className="text-lg leading-relaxed text-slate-600">
                Mined from ancient sea beds deep within the Himalayan mountains, our pink salt 
                contains 84 essential trace minerals that have been preserved for over 250 million years.
              </p>
              <p className="text-lg leading-relaxed text-slate-600">
                Unlike processed table salt, Himalayan pink salt is unrefined and contains no additives, 
                making it one of the purest forms of salt available. Its distinctive pink hue comes from 
                the natural iron oxide content.
              </p>
              <p className="text-lg leading-relaxed text-slate-600">
                From enhancing the flavor of your favorite dishes to supporting your body&apos;s natural 
                mineral balance, Himalayan pink salt is a versatile addition to any wellness-focused lifestyle.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/products"
                  className="inline-block rounded-lg bg-[#CE978C] px-8 py-3 font-sans text-base font-medium text-white transition-all hover:bg-[#B8857A] hover:shadow-lg"
                >
                  Explore Products
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* What Our Customers Say - Three Cards */}
      <AnimatedSection className="bg-[#EAE9E3] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center font-serif text-4xl font-light text-slate-800 md:text-5xl"
          >
            What Our Customers Say
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <AnimatedCard key={index} index={index}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-lg bg-white p-8 shadow-sm"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-medium text-slate-800">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-slate-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="mb-4 flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-slate-600 italic">
                    <span className="text-[#CE978C] font-semibold">&quot;</span>
                    {testimonial.text}
                    <span className="text-[#CE978C] font-semibold">&quot;</span>
                  </p>
                </motion.div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Experience the Essence - Two Big Images Side by Side */}
      <AnimatedSection className="bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center font-serif text-4xl font-light text-slate-800 md:text-5xl"
          >
            Experience the Essence
          </motion.h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              className="relative h-96 overflow-hidden rounded-lg md:h-[500px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1608039829573-803a9b3d3f0e?w=1000&h=1000&fit=crop"
                alt="Himalayan Salt Crystals"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="relative h-96 overflow-hidden rounded-lg md:h-[500px]"
            >
              <Image
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1000&h=1000&fit=crop"
                alt="Salt Lamp"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Two Cards Over Images Section */}
      <AnimatedSection className="relative bg-white px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-96 overflow-hidden rounded-lg md:h-[400px]">
                <Image
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop"
                  alt="Cooking with Salt"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <motion.div
                whileHover={{ y: -5 }}
                className="absolute -bottom-6 left-6 right-6 rounded-lg bg-white p-6 shadow-lg"
              >
                <h3 className="mb-2 font-serif text-2xl font-light text-slate-800">
                  Culinary Excellence
                </h3>
                <p className="text-slate-600">
                  Elevate your dishes with the pure, mineral-rich flavor of Himalayan salt.
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-96 overflow-hidden rounded-lg md:h-[400px]">
                <Image
                  src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=600&fit=crop"
                  alt="Wellness Benefits"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <motion.div
                whileHover={{ y: -5 }}
                className="absolute -bottom-6 left-6 right-6 rounded-lg bg-white p-6 shadow-lg"
              >
                <h3 className="mb-2 font-serif text-2xl font-light text-slate-800">
                  Natural Wellness
                </h3>
                <p className="text-slate-600">
                  Support your health journey with nature&apos;s most essential minerals.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Discover Insight Tips - Three Cards */}
      <AnimatedSection className="bg-[#FAF8F5] px-4 py-20 pt-32">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center font-serif text-4xl font-light text-slate-800 md:text-5xl"
          >
            Discover Insight Tips
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {tips.map((tip, index) => (
              <AnimatedCard key={index} index={index}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="group overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={tip.image}
                      alt={tip.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 font-serif text-2xl font-light text-slate-800">
                      {tip.title}
                    </h3>
                    <p className="mb-4 text-slate-600">{tip.description}</p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href="/blog"
                        className="inline-block rounded-lg bg-[#CE978C] px-6 py-2 text-sm font-medium text-white transition-all hover:bg-[#B8857A]"
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

      {/* Our Trusted Quality Certification */}
      <AnimatedSection className="border-y border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center font-serif text-3xl font-light text-slate-800 md:text-4xl"
          >
            Our Trusted Quality Certification
          </motion.h2>
          <div className="flex flex-wrap items-center justify-center gap-12">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="text-5xl">{cert.logo}</div>
                <span className="text-base font-medium text-slate-700">{cert.name}</span>
              </motion.div>
            ))}
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
