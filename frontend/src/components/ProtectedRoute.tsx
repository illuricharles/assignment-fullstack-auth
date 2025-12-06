
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "./Loader";


export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate()
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader/>
  }

  if (!isAuthenticated) {
    navigate('/login', {replace: true})
    return null
  }

  return children;
}
