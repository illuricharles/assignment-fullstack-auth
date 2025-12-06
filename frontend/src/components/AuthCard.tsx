import type { ReactNode } from "react"

interface AuthCardProps {
  children: ReactNode
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">{children}</div>
    </div>
  )
}
