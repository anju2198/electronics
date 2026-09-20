const API_URL = (import.meta.env.VITE_API_URL || 'https://electronicsweb-piii.onrender.com/api').replace(/\/$/, '')

async function request(path, options = {}) {
  const token = localStorage.getItem('volt_token')
  const response = await fetch(`${API_URL}${path}`,
    { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers } })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const api = {
  getProducts: (category = '', search = '') => request(`/products${category || search ? `?${new URLSearchParams({ ...(category ? { category } : {}), ...(search ? { search } : {}) }).toString()}` : ''}`),
  getProduct: (id) => request(`/products/${id}`),
  createProduct: (payload) => request('/products',
    {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  updateProduct: (id, payload) => request(`/products/${id}`,
    { method: 'PATCH', body: JSON.stringify(payload) }),
  deleteProduct: (id) => request(`/products/${id}`, { method: 'DELETE' }),
  register: (payload) => request('/auth/register',
    {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  login: (payload) => request('/auth/login',
    {
      method: 'POST',
      body: JSON.stringify(payload)
    }),
  createOrder: (payload) => request('/orders',
    { method: 'POST', body: JSON.stringify(payload) }),
  getOrders: () => request('/orders'),
  getUsers: () => request('/users'),
}
