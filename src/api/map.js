import request from '../utils/request'

const mapData = () => {
  return request.get(import.meta.env.VITE_MAP_URL, { baseUrl: '' })
}

export { mapData }
