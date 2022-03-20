import { Data } from '@/model/data'
import { Support } from '@/model/support'

export interface User {
  page: number
  perPage: number
  total: number
  totalPages: number
  data: Data
  support: Support
}
