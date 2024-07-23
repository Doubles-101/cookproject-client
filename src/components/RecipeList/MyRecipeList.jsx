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
        <div className="myRecipeList-container">
            <div className="header"><h1>My Recipes: </h1></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                    myRecipesArray.map(recipe => <div key={`key-${recipe.id}`} className="border p-5 border-solid hover:bg-blue-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50">
                        <div>
                            <Link to={`/recipeDetails/${recipe.id}`}>
                                <div>{recipe.title} ({recipe.description})</div>
                            </Link>
                        </div>
                     </div>)
                }
            </div>
        </div>
    )
}