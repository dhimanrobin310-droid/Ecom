export const imageUrl = (value) => {
  if (!value || value === 'no img') return ''
  return /^(https?:|data:)/i.test(value) ? value : `/uploads/${value}`
}
