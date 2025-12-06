import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loader from "./Loader";


export default function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  
  if (loading) return <Loader/>


  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children;
}
