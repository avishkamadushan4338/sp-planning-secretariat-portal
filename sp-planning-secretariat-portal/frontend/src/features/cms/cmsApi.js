import axios from 'axios'

const api = axios.create({ baseURL: `${import.meta.env.VITE_API_URL || ''}/api/uploads` })

export const uploadImage = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return api.post('/image', formData)
}
