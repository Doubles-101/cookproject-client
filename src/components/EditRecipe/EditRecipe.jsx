import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const EditRecipe = () => {
    const [currentRecipe, setCurrentRecipe] = useState({})
    const navigate = useNavigate()
    const {recipeId} = useParams()

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
        <>Edit Recipe {recipeId}</>
    )
}