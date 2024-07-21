import { useEffect, useState } from "react"


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

    const fetchCategoriesList = async () => {
        const response = await fetch(`http://localhost:8000/categories`, {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
            }
        })
        const category = await response.json()
        setCategoriesList(category)
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
        updateCurrentUserDetails(),
        navigate(`/profile/${profileId}`)
    }

    useEffect(() => {
        fetchCategoriesList()
    }, [])
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={formData.description} name="description" onChange={handleChange} />
                </div>
                <div>
                    <label>Instructions:</label>
                    <textarea value={formData.instructions} name="intructions" onChange={handleChange} />
                </div>
                <div>
                    <label>Ingredients:</label>
                    <textarea value={formData.ingredients} name="ingredients" onChange={handleChange} />
                </div>
                <div>
                    <label>Time (minutes):</label>
                    <input
                        type="number"
                        name="time"
                        value={formData.time}
                        min="1"
                        max="15"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Categories:</label>
                    {categoriesList.map(category => (
                        <div key={category.id}>
                            <input
                                type="checkbox"
                                id={`category-${category.id}`}
                                checked={selectedCategories.includes(category.id)}
                                onChange={() => handleCategoryChange(category.id)}
                            />
                            <label htmlFor={`category-${category.id}`}>{category.name}</label>
                        </div>
                    ))}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}