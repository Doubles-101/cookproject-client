import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "./Navbar.jsx"
import { Footer } from "./Footer.jsx"

export const Authorized = () => {
  if (localStorage.getItem("cook_token")) {
    return <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  }
  return <Navigate to='/login' replace />
}
