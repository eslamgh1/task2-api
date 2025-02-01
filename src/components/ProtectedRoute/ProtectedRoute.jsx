
import { Navigate } from 'react-router-dom'
import style from './ProtectedRoute.module.css'





export default function ProtectedRoute({children}) {

  if(localStorage.getItem('tkn')==null){
    return <Navigate to={'/login'} />
  }

  return children



}

