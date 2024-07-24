import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"



export const RecipeDetail = () => {
    const [currentRecipe, setCurrentRecipe] = useState({})
    const [imgString, setImageString] = useState("")
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

    const postRecipePicture = async () => {
        const response = await fetch(`http://localhost:8000/pictures`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                recipe_id: recipeId,
                recipe_image: imgString
            })
        })
        const parsedJSONString = await response.json()
        navigate('/games')
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

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createGameImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
    
            setImageString(base64ImageString)
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


    return (
        <div>
            <div>{currentRecipe.title}</div>
            <div>{currentRecipe.description}</div>
            <div>Time:  <div>{currentRecipe.time} Minutes</div></div>
            <div>Categories:  {currentRecipe.categories?.map(category => <div key={category.id}>{category.name}</div>)}</div>
            <div>Ingredients:  <div>{currentRecipe.ingredients}</div></div>
            <div>{currentRecipe.instructions}</div>
            <input type="file" id="game_image" onChange={createGameImageString} />
            <input type="hidden" name="recipe_id" value={recipeId} />
            <button className="button p-2 m-2 bg-blue-500 text-white" onClick={postRecipePicture}>Upload</button>
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