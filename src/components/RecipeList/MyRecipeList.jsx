import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"


export const MyRecipeList = () => {
    const [myRecipesArray, setMyRecipesArray] = useState([])

    const customerId = JSON.parse(localStorage.getItem("cook_token")).id

    const fetchMyRecipes = async () => {
        if (customerId) {
            const response = await fetch(`http://localhost:8000/recipes?customerId=${customerId}`, {
                headers: {
                    Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
                }
            })
            const recipes = await response.json()
            setMyRecipesArray(recipes)
        }
    }

    useEffect(() => {
        fetchMyRecipes()
    }, [customerId])

    return (
        <div className="myRecipeList-container p-6 bg-gray-100 rounded-lg shadow-md">
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
            </div>
        </div>
    )
}