import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"


export const MyRecipeList = () => {
    const [myRecipesArray, setMyRecipesArray] = useState([])

    const navigate = useNavigate()
    const customerId = JSON.parse(localStorage.getItem("cook_token")).id

    const fetchMyRecipes = async () => {
        if (customerId) {
            const response = await fetch(`https://quick-cooks-api-7qoji.ondigitalocean.app/recipes?customerId=${customerId}`, {
                headers: {
                    Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
                }
            })
            const recipes = await response.json()
            setMyRecipesArray(recipes)
        }
    }

    const handleClick = () => {
        navigate("/createRecipe")
    }

    useEffect(() => {
        fetchMyRecipes()
    }, [customerId])

    return (
        <div className="myRecipeList-container p-6 m-4 bg-gray-100 rounded-lg shadow-md">
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-900">My Recipes</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                    myRecipesArray.map(recipe => 
                        <div 
                            key={`key-${recipe.id}`} 
                            className="border p-5 border-solid hover:bg-gray-600 hover:text-white rounded-md border-gray-300 bg-white shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                        <div>
                            <Link to={`/recipeDetails/${recipe.id}`}>
                                <div>
                                    <span className="font-bold text-lg">{recipe.title}</span>
                                    <span className="text-gray-600"> ({recipe.description})</span>
                                </div>
                            </Link>
                        </div>
                     </div>)
                }
                {myRecipesArray.length === 0 && 
                    <div className="col-span-full text-center">
                    <p className="text-gray-600">You haven't created any recipes yet.</p>
                    <button
                        className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleClick}
                    >
                        Create a Recipe
                    </button>
                </div>}

            </div>
        </div>
    )
}