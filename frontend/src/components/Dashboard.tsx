import { LogOut } from "lucide-react"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
    const {user, logout} = useAuth()
    const navigate = useNavigate()
    function handleLogOut() {
        logout()
        navigate('/login', {replace: true})
    }
    return <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          
          <button onClick={handleLogOut}  className="cursor-pointer ml-auto inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
          px-4 py-2 text-base gap-2
          text-blue-600 hover:bg-blue-50 active:bg-blue-100
          ">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Hello, {user?.name}. Welcome to your dashboard</h1>
          <p className="text-slate-600 mb-6">
            You've successfully logged into the Application. This is your main dashboard view.
          </p>

          <div className="space-y-6">
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">User Information</h2>
              <div className="space-y-2">
                <p className="text-slate-600">
                  <span className="font-medium">Email:</span> {user?.email}
                </p>
                <p className="text-slate-600">
                  <span className="font-medium">Account Status:</span> Active
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
}