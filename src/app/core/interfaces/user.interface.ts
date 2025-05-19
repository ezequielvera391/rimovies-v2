export interface User {
  id: number
  email: string
  username: string
  role: 'user' | 'admin' // TODO: check if it's the better way to manage roles
}
