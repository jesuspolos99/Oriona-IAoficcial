import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Tipos de datos
export interface User {
  id: number
  email: string
  name: string
  created_at: string
  is_verified: boolean
}

export interface Chat {
  id: number
  user_id: number
  title: string
  created_at: string
  updated_at: string
}

export interface Message {
  id: number
  chat_id: number
  role: "user" | "assistant"
  content: string
  created_at: string
}

export interface Session {
  id: string
  user_id: number
  expires_at: string
}
