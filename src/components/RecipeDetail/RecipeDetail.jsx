import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"



export const RecipeDetail = () => {
    const [currentRecipe, setCurrentRecipe] = useState({})
    const { recipeId } = useParams()

    const fetchCurrentRecipe = async () => {
        const response = await fetch(`http://localhost:8000/recipes/${recipeId}`, {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
            }
        })
        const recipe = await response.json()
        setCurrentRecipe(recipe)
    }

    useEffect(() => {
        fetchCurrentRecipe()
    }, [])


    return (
        <div>
            <div>{currentRecipe.title}</div>
            <div>{currentRecipe.description}</div>
            <div>Time:  <div>{currentRecipe.time} Minutes</div></div>
            <div>Categories:  {currentRecipe.categories?.map(category => <div key={category.id}>{category.name}</div>)}</div>
            <div>Ingredients:  <div>{currentRecipe.ingredients}</div></div>
            <div>{currentRecipe.instructions}</div>
        </div>
    )
}