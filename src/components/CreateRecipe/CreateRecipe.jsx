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

    const navigate = useNavigate()

    const fetchCategoriesList = async () => {
        const response = await fetch(`http://localhost:8000/categories`, {
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

        const response = await fetch(`http://localhost:8000/recipes`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody)
        })
        const parsedJSONString = await response.json()
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
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

    const handleSubmit = (e) => {
        e.preventDefault()

        if (
            !formData.title ||
            !formData.description ||
            !formData.instructions ||
            !formData.ingredients ||
            !formData.time ||
            selectedCategories.length === 0
        ) {
            window.alert("Please fill out all fields and select at least one category.")
            return
        }
        postNewRecipe()
        navigate(`/recipelist`)
    }

    useEffect(() => {
        fetchCategoriesList()
    }, [])
    
    return (
        <div className="max-w-2xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white p-2 border focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white p-2 border focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Instructions:</label>
                    <textarea
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white p-2 border focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ingredients:</label>
                    <textarea
                        name="ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white p-2 border focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Time (minutes):</label>
                    <input
                        type="number"
                        name="time"
                        value={formData.time}
                        min="1"
                        max="15"
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white p-2 border focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                <div>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}