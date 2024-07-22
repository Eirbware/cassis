interface Link {
  uid: string
  url: string
  createdAt: Date
  createdBy: string
  expiresAt: Date | null
  visited: number
}

type SerializedLink = Exclude<Link, 'createdAt' | 'expiresAt' | 'createdBy'> & {
  createdAt: string
}

export type { Link, SerializedLink }
