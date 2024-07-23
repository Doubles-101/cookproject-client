import { NavLink, useNavigate } from "react-router-dom"
import "./Navbar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    const customerId =  JSON.parse(localStorage.getItem("cook_token")).id

    return (
        <ul className="navbar pb-10">
            <li className="navbar__item pl-10">
                <NavLink className="text-left underline text-blue-600 hover:text-purple-700" to={"/"}>Home</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink className="text-left underline text-blue-600 hover:text-purple-700" to={"/recipelist"}>Recipes</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink className="text-left underline text-blue-600 hover:text-purple-700" to={"/createRecipe"}>Create Recipe</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink className="text-left underline text-blue-600 hover:text-purple-700" to={"/myRecipeList"}>My Recipes</NavLink>
            </li>
            <li className="navbar__item">
                <NavLink className="text-left underline text-blue-600 hover:text-purple-700" to={`/profile/${customerId}`}>Profile</NavLink>
            </li>
            {
                (localStorage.getItem("cook_token") !== null) ?
                    <li className="navbar__item">
                        <button className="underline text-blue-600 hover:text-purple-700"
                            onClick={() => {
                                localStorage.removeItem("cook_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="navbar__item">
                            <NavLink className="text-left underline text-blue-600 hover:text-purple-700" to={"/login"}>Login</NavLink>
                        </li>
                        <li className="navbar__item">
                            <NavLink className="text-left underline text-blue-600 hover:text-purple-700" to={"/register"}>Register</NavLink>
                        </li>
                    </>
            }        </ul>
    )
}