import { API_BASE_URL } from './apiConfig'

export const imageUrl = (value) => {
  if (!value || value === 'no img') return ''
  return /^(https?:|data:)/i.test(value) ? value : `${API_BASE_URL}/uploads/${value}`
}

