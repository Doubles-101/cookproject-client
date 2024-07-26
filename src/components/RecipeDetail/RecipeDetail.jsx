import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"



export const RecipeDetail = () => {
    const [currentRecipe, setCurrentRecipe] = useState({})
    const [currentRecipeImage, setCurrentRecipeImage] = useState("")
    const { recipeId } = useParams()
    const navigate = useNavigate()

    const customerId = JSON.parse(localStorage.getItem("cook_token")).id

    const fetchCurrentRecipe = async () => {
        const response = await fetch(`http://localhost:8000/recipes/${recipeId}`, {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
            }
        })
        const recipe = await response.json()
        setCurrentRecipe(recipe)
    }
    
    const fetchCurrentRecipeImage = async () => {
        const response = await fetch(`http://localhost:8000/pictures/${recipeId}`, {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
            }
        })
        const recipeimg = await response.json()
        setCurrentRecipeImage(recipeimg)
    }

    const deleteCurrentRecipe = async () => {
        await fetch(`http://localhost:8000/recipes/${recipeId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`,
                "Content-Type": "application/json"
            }
        })
    }

    const handleEdit = async () => {
        navigate(`/editRecipe/${recipeId}`)
    }

    const handleDelete = async () => {
        await deleteCurrentRecipe()
        navigate("/myRecipeList")
    }

    useEffect(() => {
        fetchCurrentRecipe()
    }, [])

    useEffect(() => {
        fetchCurrentRecipeImage()
    }, [])


    return (
        <div>
            {currentRecipeImage && <img src={currentRecipeImage.recipe_pic} alt="Recipe-Img" className="max-h-96 w-full object-contain"/>}
            <div>{currentRecipe.title}</div>
            <div>{currentRecipe.description}</div>
            <div>Time:  <div>{currentRecipe.time} Minutes</div></div>
            <div>Categories:  {currentRecipe.categories?.map(category => <div key={category.id}>{category.name}</div>)}</div>
            <div>Ingredients:  <div>{currentRecipe.ingredients}</div></div>
            <div>{currentRecipe.instructions}</div>
            <div>
                {customerId == currentRecipe.customer &&
                    <div>
                        <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 
                        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleEdit}
                        >Edit</button>
                        <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 
                        hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-4"
                        onClick={handleDelete}
                        >Delete</button>
                    </div>}
            </div>
        </div>
    )
}