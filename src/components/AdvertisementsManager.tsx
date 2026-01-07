'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface Advertisement {
  id: string
  title: string
  description?: string | null
  image_url?: string | null
  link_url?: string | null
  is_active: boolean
  position?: string | null
  start_date?: string | null
  end_date?: string | null
}

interface AdvertisementsManagerProps {
  advertisements: Advertisement[]
}

export default function AdvertisementsManager({ advertisements: initialAds }: AdvertisementsManagerProps) {
  const [ads, setAds] = useState(initialAds)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    link_url: '',
    is_active: true,
    position: 'banner',
    start_date: '',
    end_date: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('advertisements')
      .insert({
        ...formData,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
      })
      .select()
      .single()

    if (!error && data) {
      setAds([data, ...ads])
      setShowForm(false)
      setFormData({
        title: '',
        description: '',
        image_url: '',
        link_url: '',
        is_active: true,
        position: 'banner',
        start_date: '',
        end_date: '',
      })
    }
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    const supabase = createClient()
    const { data } = await supabase
      .from('advertisements')
      .update({ is_active: !currentStatus })
      .eq('id', id)
      .select()
      .single()

    if (data) {
      setAds(ads.map(ad => ad.id === id ? data : ad))
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-4xl font-light text-slate-800 md:text-5xl">
          Advertisements Management
        </h1>
        <div className="flex gap-4">
          <Link
            href="/admin"
            className="rounded-lg bg-slate-600 px-6 py-2 text-white transition-colors hover:bg-slate-700"
          >
            Back to Dashboard
          </Link>
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-[#CE978C] px-6 py-2 text-white transition-colors hover:bg-[#B8857A]"
          >
            {showForm ? 'Cancel' : 'Add New Ad'}
          </button>
        </div>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-lg bg-white p-6 shadow-sm"
        >
          <h2 className="mb-4 font-serif text-2xl font-light text-slate-800">Add New Advertisement</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-2 focus:ring-[#CE978C]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Position</label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-2 focus:ring-[#CE978C]"
                >
                  <option value="hero">Hero</option>
                  <option value="sidebar">Sidebar</option>
                  <option value="footer">Footer</option>
                  <option value="banner">Banner</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-2 focus:ring-[#CE978C]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Link URL</label>
                <input
                  type="url"
                  value={formData.link_url}
                  onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-2 focus:ring-[#CE978C]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
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
            <button
              type="submit"
              className="rounded-lg bg-[#CE978C] px-6 py-2 text-white transition-colors hover:bg-[#B8857A]"
            >
              Create Advertisement
            </button>
          </form>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ads.map((ad) => (
          <div key={ad.id} className="overflow-hidden rounded-lg bg-white shadow-sm">
            {ad.image_url && (
              <div className="relative h-48 w-full">
                <Image
                  src={ad.image_url}
                  alt={ad.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="mb-2 text-xl font-semibold text-slate-800">{ad.title}</h3>
              <p className="mb-2 text-sm text-slate-600">{ad.description}</p>
              <p className="mb-2 text-sm text-slate-600">
                Position: <span className="font-medium">{ad.position}</span>
              </p>
              <p className="mb-4 text-sm text-slate-600">
                Status: <span className={`font-medium ${ad.is_active ? 'text-green-600' : 'text-red-600'}`}>
                  {ad.is_active ? 'Active' : 'Inactive'}
                </span>
              </p>
              <button
                onClick={() => toggleActive(ad.id, ad.is_active)}
                className="w-full rounded-lg bg-[#CE978C] px-4 py-2 text-sm text-white transition-colors hover:bg-[#B8857A]"
              >
                {ad.is_active ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

