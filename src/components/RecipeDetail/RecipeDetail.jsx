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
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
            {currentRecipeImage && (
                <img
                    src={currentRecipeImage.recipe_pic}
                    alt="Recipe-Img"
                    className="max-h-96 w-full object-contain mb-4 rounded-lg"
                />
            )}
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{currentRecipe.title}</h1>
                <p className="text-gray-700">{currentRecipe.description}</p>
            </div>
            <div className="mb-4">
                <span className="font-semibold text-gray-800">Time: </span> 
                <span className="text-gray-700">{currentRecipe.time} Minutes</span>
            </div>
            <div className="mb-4">
                <span className="font-semibold text-gray-800">Categories: </span>
                {currentRecipe.categories?.map(category => (
                    <span
                        key={category.id}
                        className="inline-block bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded-full mr-2"
                    >
                        {category.name}
                    </span>
                ))}
            </div>
            <div className="mb-4">
                <span className="font-semibold text-gray-800">Ingredients:</span> 
                <p className="text-gray-700">{currentRecipe.ingredients}</p>
            </div>
            <div className="mb-4 text-gray-700">
                <span className="font-semibold text-gray-800">Instructions:</span> 
                <p className="text-gray-700">{currentRecipe.instructions}</p>
            </div>
            {customerId === currentRecipe.customer && (
                <div className="flex space-x-4">
                    <button
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-black 
                        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                    <button
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-black
                        hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}