export interface Report {
  id: number
  title: string
  description: string
  date: string
  type: string
  project: {
    id: number
    name: string
    color: string
  }
  author: string
  size: string
  format: string
}

export interface Contract {
  id: number
  title: string
  description: string
  date: string
  status: string
  project: {
    id: number
    name: string
    color: string
  }
  client: string
  value: string
  endDate: string
}
