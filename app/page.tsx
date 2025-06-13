"use client"
import { Orbitron, Inter } from "next/font/google"
import { ChatForm } from "@/components/chat-form"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export default function Page() {
  return <ChatForm />
}
