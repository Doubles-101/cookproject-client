import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const EditRecipe = () => {
    const [categoriesList, setCategoriesList] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [currentRecipe, setCurrentRecipe] = useState({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        time: '',
        categories: []
    })
    const navigate = useNavigate()
    
    const {recipeId} = useParams()



    const fetchCategoriesList = async () => {
        const response = await fetch(`http://localhost:8000/categories`, {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
            }
        })
        const category = await response.json()
        setCategoriesList(category)
    }

    const fetchCurrentRecipe = async () => {
        const response = await fetch(`http://localhost:8000/recipes/${recipeId}`, {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
            }
        })
        const recipe = await response.json()
        setCurrentRecipe(recipe)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setCurrentRecipe({
            ...currentRecipe,
            [name]: value
        })
    }

    const handleCategoryChange = (id) => {
        setSelectedCategories(prevState => 
            prevState.includes(id) 
            ? prevState.filter(categoryId => categoryId !== id) 
            : [...prevState, id]
        )
    }

    const handleSave = async (e) => {
        e.preventDefault()
        if (selectedCategories.length === 0) {
            window.alert("Please select at least one category.")
            return
        }
        const response = await fetch(`http://localhost:8000/recipes/${recipeId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: currentRecipe.title,
                description: currentRecipe.description,
                instructions: currentRecipe.instructions,
                ingredients: currentRecipe.ingredients,
                time: currentRecipe.time,
                categories: selectedCategories

            })
        })
        navigate(`/recipeDetails/${recipeId}`)
    }

    useEffect(() => {
        fetchCurrentRecipe()
        fetchCategoriesList()
    }, [])


    return (
    <div>
        <form onSubmit={handleSave} className="space-y-6 bg-white p-8 rounded shadow-md">
            <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-2" htmlFor="title">Title:</label>
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    value={currentRecipe.title} 
                    onChange={handleInputChange} 
                    className="p-2 border border-gray-300 rounded" 
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-2" htmlFor="description">Description:</label>
                <input 
                    type="text" 
                    id="description" 
                    name="description" 
                    value={currentRecipe.description} 
                    onChange={handleInputChange} 
                    className="p-2 border border-gray-300 rounded" 
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-2" htmlFor="time">Time (Minutes):</label>
                <input 
                    type="number" 
                    id="time" 
                    name="time" 
                    value={currentRecipe.time} 
                    onChange={handleInputChange} 
                    className="p-2 border border-gray-300 rounded" 
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-2" htmlFor="ingredients">Ingredients:</label>
                <textarea 
                    id="ingredients" 
                    name="ingredients" 
                    value={currentRecipe.ingredients} 
                    onChange={handleInputChange} 
                    className="p-2 border border-gray-300 rounded" 
                />
            </div>
            <div className="flex flex-col">
                <label className="text-gray-700 font-semibold mb-2" htmlFor="instructions">Instructions:</label>
                <textarea 
                    id="instructions" 
                    name="instructions" 
                    value={currentRecipe.instructions} 
                    onChange={handleInputChange} 
                    className="p-2 border border-gray-300 rounded" 
                />
            </div>
            <div>
                    <label className="block text-sm font-medium text-gray-700">Categories:</label>
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
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mt-4 hover:bg-blue-600 transition duration-300">
                Save
            </button>
        </form>
       </div> 
    )
}