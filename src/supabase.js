import { createClient } from '@supabase/supabase-js'

// --- Cấu hình Supabase của saurus2408 ---
const supabaseUrl = 'https://tefvcuhuqbnbxlfzlifb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlZnZjdWh1cWJuYnhsZnpsaWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNDk3MTUsImV4cCI6MjA4OTgyNTcxNX0.g3xmzG-Vb7nPiRywjYiEI6iDpOJXKxJd6WYoHG8_o4M'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper functions for Database (Supabase Version)
export const database = {
  // Products
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true })
    if (error) return [] 
    return data
  },

  async addProduct(product) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
    if (error) throw error
    return data[0]
  },

  async updateProduct(id, updates) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
    if (error) throw error
    return data
  },

  async deleteProduct(id) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  // Orders
  async getOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) return []
    return data
  },

  async getOrderById(id) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()
    if (error) return null
    return data
  },

  async addOrder(order) {
    const { data, error } = await supabase
      .from('orders')
      .insert([{
        ...order,
        status: 'pending',
        created_at: new Date().toISOString()
      }])
      .select()
    if (error) throw error
    return data[0]
  },

  async updateOrderStatus(id, status) {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
    if (error) throw error
  },

  // Contacts
  async getContacts() {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) return []
    return data
  },

  async addContact(contact) {
    const { data, error } = await supabase
      .from('contacts')
      .insert([{
        ...contact,
        created_at: new Date().toISOString()
      }])
      .select()
    if (error) throw error
    return data[0]
  },

  // Blog / Knowledge
  async getBlogPosts() {
    const { data, error } = await supabase
      .from('blog')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) return []
    return data
  },

  async addBlogPost(post) {
    const { data, error } = await supabase
      .from('blog')
      .insert([{
        ...post,
        created_at: new Date().toISOString()
      }])
      .select()
    if (error) throw error
    return data[0]
  },

  async updateBlogPost(id, updates) {
    const { data, error } = await supabase
      .from('blog')
      .update(updates)
      .eq('id', id)
    if (error) throw error
    return data
  },

  async deleteBlogPost(id) {
    const { error } = await supabase
      .from('blog')
      .delete()
      .eq('id', id)
    if (error) throw error
  }
}
