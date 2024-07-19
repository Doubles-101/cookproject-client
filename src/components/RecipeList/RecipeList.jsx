import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'


export const RecipeList = () => {
    const [allRecipes, setAllRecipes] = useState([])

    const fetchAllRecipes = async () => {
        const response = await fetch(`http://localhost:8000/recipes`, {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
            }
        })
        const recipes = await response.json()
        setAllRecipes(recipes)
    }

    useEffect(() => {
        fetchAllRecipes()
    }, [])

    return (
        <div className="recipelist-container">
            <div className="header"><h1>All Recipes: </h1></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                    allRecipes.map(recipe => <div key={`key-${recipe.id}`} className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50">
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