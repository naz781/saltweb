import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

async function checkAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return false
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, is_admin')
    .eq('id', user.id)
    .single()

  return profile && (profile.role === 'admin' || profile.is_admin === true)
}

export default async function AdminDashboard() {
  const isAdmin = await checkAdmin()
  
  if (!isAdmin) {
    redirect('/login')
  }

  const supabase = await createClient()
  
  // Get stats
  const { count: ordersCount } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })

  const { count: productsCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })

  const { count: adsCount } = await supabase
    .from('advertisements')
    .select('*', { count: 'exact', head: true })

  const { data: recentOrders } = await supabase
    .from('orders')
    .select('*, profiles(full_name, email)')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="mb-8 font-serif text-4xl font-light text-slate-800 md:text-5xl">
          Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-sm font-medium text-slate-600">Total Orders</h3>
            <p className="text-3xl font-bold text-slate-800">{ordersCount || 0}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-sm font-medium text-slate-600">Total Products</h3>
            <p className="text-3xl font-bold text-slate-800">{productsCount || 0}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-sm font-medium text-slate-600">Active Ads</h3>
            <p className="text-3xl font-bold text-slate-800">{adsCount || 0}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="mb-6 font-serif text-2xl font-light text-slate-800">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/admin/inventory"
              className="rounded-lg bg-[#CE978C] p-6 text-center text-white transition-colors hover:bg-[#B8857A]"
            >
              <div className="mb-2 text-3xl">📦</div>
              <div className="font-medium">Manage Inventory</div>
            </Link>
            <Link
              href="/admin/orders"
              className="rounded-lg bg-[#CE978C] p-6 text-center text-white transition-colors hover:bg-[#B8857A]"
            >
              <div className="mb-2 text-3xl">🛒</div>
              <div className="font-medium">View Orders</div>
            </Link>
            <Link
              href="/admin/advertisements"
              className="rounded-lg bg-[#CE978C] p-6 text-center text-white transition-colors hover:bg-[#B8857A]"
            >
              <div className="mb-2 text-3xl">📢</div>
              <div className="font-medium">Manage Ads</div>
            </Link>
            <Link
              href="/admin/invoices"
              className="rounded-lg bg-[#CE978C] p-6 text-center text-white transition-colors hover:bg-[#B8857A]"
            >
              <div className="mb-2 text-3xl">📄</div>
              <div className="font-medium">Generate Invoices</div>
            </Link>
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <h2 className="mb-6 font-serif text-2xl font-light text-slate-800">Recent Orders</h2>
          <div className="overflow-hidden rounded-lg bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-[#EAE9E3]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Customer</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-slate-700">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recentOrders && recentOrders.length > 0 ? (
                  recentOrders.map((order: any) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {order.id.substring(0, 8)}...
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {order.profiles?.full_name || order.profiles?.email || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">
                        ${Number(order.total_amount).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`rounded-lg px-3 py-1 text-xs font-medium ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-600">
                      No orders yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

