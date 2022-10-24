import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth";

export const AuthLayout = () => {

  const { auth } = useAuth();

  return (
    <>
    {
      auth._id ? 
      <Navigate to='/admin' /> :
        <main className="container mx-auto md:grid md:grid-cols-2 mt-12 w-10/12 items-center">
          <Outlet/>
        </main>
    }
    </>
  )
};
