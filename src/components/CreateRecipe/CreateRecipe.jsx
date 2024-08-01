import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const CreateRecipe = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        instructions: '',
        ingredients: '',
        time: ''
    })
    const [categoriesList, setCategoriesList] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [imgString, setImageString] = useState("")

    const navigate = useNavigate()

    const fetchCategoriesList = async () => {
        const response = await fetch(`https://quick-cooks-api-7qoji.ondigitalocean.app/categories`, {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
            }
        })
        const category = await response.json()
        setCategoriesList(category)
    }

    const postNewRecipe = async () => {
        const requestBody = {
            title: formData.title,
            description: formData.description,
            instructions: formData.instructions,
            ingredients: formData.ingredients,
            time: formData.time,
            categories: selectedCategories 
        }

        const response = await fetch(`https://quick-cooks-api-7qoji.ondigitalocean.app/recipes`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
        
        if (response.ok) {
            const recipe = await response.json()
            return recipe.id
        } else {
            const error = await response.json()
            throw new Error(error)
        }
    }

    const postRecipeImage = async (recipeId) => {
        const requestBody = {
            recipe_id: recipeId,
            recipe_image: imgString
        }

        const response = await fetch(`https://quick-cooks-api-7qoji.ondigitalocean.app/pictures`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleCategoryChange = (id) => {
        setSelectedCategories(prevState => 
            prevState.includes(id) 
            ? prevState.filter(categoryId => categoryId !== id) 
            : [...prevState, id]
        )
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => callback(reader.result))
        reader.readAsDataURL(file)
    }

    const createRecipeImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString)
            setImageString(base64ImageString)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (
            !formData.title ||
            !formData.description ||
            !formData.instructions ||
            !formData.ingredients ||
            !formData.time ||
            selectedCategories.length === 0 ||
            !imgString
        ) {
            window.alert("Please fill out all fields, select at least one category, and upload an image.")
            return
        }

        try {
            const recipeId = await postNewRecipe()
            await postRecipeImage(recipeId)
            navigate(`/myRecipeList`)
        } catch (error) {
            console.error("Error creating recipe:", error)
        }
    }

    useEffect(() => {
        fetchCategoriesList()
    }, [])
    
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Create Recipe</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label className="text-gray-700 font-semibold m-2">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-gray-700 font-semibold m-2">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-gray-700 font-semibold m-2">Instructions:</label>
                    <textarea
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-gray-700 font-semibold m-2">Ingredients:</label>
                    <textarea
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-gray-700 font-semibold m-2">Time (minutes):</label>
                    <input
                        type="number"
                        name="time"
                        value={formData.time}
                        min="1"
                        max="15"
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-gray-700 font-semibold m-2">Categories:</label>
                    <div className="mt-2 space-y-2">
                        {categoriesList.map(category => (
                            <div key={category.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`category-${category.id}`}
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={() => handleCategoryChange(category.id)}
                                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label htmlFor={`category-${category.id}`} className="ml-2 block text-sm text-gray-900">
                                    {category.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-gray-700 font-semibold m-2">Image:</label>
                    <input type="file" id="recipe_image" onChange={createRecipeImageString} />
                </div>
                <button type="submit" className="w-full bg-black text-white py-2 rounded-full mt-4 hover:bg-blue-600 transition duration-300">
                    Submit
                </button>
            </form>
        </div>
    )
}
