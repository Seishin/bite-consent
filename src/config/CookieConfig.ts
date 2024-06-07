type CookieConfig = {
  name: string
  maxAge?: number
  expires?: Date
  domain?: string
  path?: string
  secure?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None'
}

export default CookieConfig
