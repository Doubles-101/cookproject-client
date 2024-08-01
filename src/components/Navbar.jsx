import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()
    const customerId =  JSON.parse(localStorage.getItem("cook_token")).id
    const [isOpen, setIsOpen] = useState(false)

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    const handleLogoClick = () => {
        navigate("/")
    }

    return (
        <div className="flex justify-between items-center w-[92%] mx-auto pt-2 mb-3">
            <div onClick={handleLogoClick} className="cursor-pointer">
                <img className="w-16" src={`/media/Quick Cooks.png`} alt="logo" />
            </div>
            <div className={`nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 ${isOpen ? 'top-[9%]' : 'top-[-100%]'} md:w-auto w-full flex items-center px-5`}>
                <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                    <li className="hover:text-gray-500">
                        <NavLink className="" to={"/"}>Home</NavLink>
                    </li>
                    <li className="hover:text-gray-500">
                        <NavLink className="" to={"/recipelist"}>Recipes</NavLink>
                    </li>
                    <li className="hover:text-gray-500">
                        <NavLink className="" to={"/createRecipe"}>Create Recipe</NavLink>
                    </li>
                    <li className="hover:text-gray-500">
                        <NavLink className="" to={"/myRecipeList"}>My Recipes</NavLink>
                    </li>
                    <li className="hover:text-gray-500">
                        <NavLink className="" to={`/profile/${customerId}`}>Profile</NavLink>
                    </li>      
                    <li className="hover:text-gray-500">
                        <NavLink className="" to={`/bloglist`}>Blog</NavLink>
                    </li>      
                </ul>
            </div>
            <div className="flex items-center gap-6">
                <button className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-600 hover:text-black"
                    onClick={() => {
                        localStorage.removeItem("cook_token")
                        navigate('/login')
                    }}
                >Logout</button>
                <div className="text-3xl cursor-pointer md:hidden" ><ion-icon onClick={handleToggle} name={isOpen ? "close" : "menu"}></ion-icon></div>
            </div>
        </div>
    )
}