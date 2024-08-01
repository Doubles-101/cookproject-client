import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'


export const RecipeList = () => {
    const [allRecipes, setAllRecipes] = useState([])
    const [searchText, setSearchText] = useState("")
    const [selectedOption, setSelectedOption] = useState("")

    const fetchAllRecipes = async () => {
        const response = await fetch(`https://quick-cooks-api-7qoji.ondigitalocean.app/recipes`, {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
            }
        })
        const recipes = await response.json()
        setAllRecipes(recipes)
    }

    const fetchSearchedRecipes = async () => {
        const response = await fetch(`https://quick-cooks-api-7qoji.ondigitalocean.app/recipes?q=${searchText}`, {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
            }
        })
        const recipes = await response.json()
        setAllRecipes(recipes)
    }

    const fetchSelectedRecipes = async () => {
        if (selectedOption !== "")
            {const response = await fetch(`https://quick-cooks-api-7qoji.ondigitalocean.app/recipes?orderby=${selectedOption}`, {
                headers: {
                    Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
                }
            })
            const recipes = await response.json()
            setAllRecipes(recipes)}
        else {fetchAllRecipes()}
    }

    useEffect(() => {
        if (window.ScrollReveal) {
          window.ScrollReveal().reveal('.recipeitem', { 
            duration: 2000,
            distance: '50px', 
            easing: 'ease-in-out',
            origin: 'bottom' 
          })
        }
      }, [])

    useEffect(() => {
        fetchAllRecipes()
    }, [])

    useEffect(() => {
        fetchSearchedRecipes()
    }, [searchText])

    useEffect(() => {
        fetchSelectedRecipes()
    }, [selectedOption])

    return (
        <div className="recipelist-container p-6 bg-gray-100 rounded-lg shadow-md m-4">
            <div className="flex flex-col sm:flex-row justify-start items-center w-[92%] mx-auto mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-full sm:w-auto">
                <input 
                    type="text"
                    name="search"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    placeholder="Search"
                    className="border-2 border-gray-600 p-3 border-solid bg-gray-200 rounded-full w-full sm:w-64 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="w-full sm:w-auto">
                <select 
                    className="border-2 border-gray-600 p-3 border-solid bg-gray-200 rounded-full w-full sm:w-64 focus:outline-none focus:border-blue-500"
                    value={selectedOption} 
                    onChange={(event) => setSelectedOption(event.target.value)}
                >
                    <option value="">Select an option</option>
                    <option value="time">Time</option>
                    <option value="title">Title</option>
                </select>
            </div>
        </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {
                    allRecipes.map(recipe => (
                        <div 
                            key={`key-${recipe.id}`} 
                            className="border p-5 border-solid hover:bg-gray-600 hover:text-white rounded-md border-gray-300 bg-white shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                        >
                            <div>
                                <Link to={`/recipeDetails/${recipe.id}`}>
                                    <div className="recipeitem">
                                        <span className="font-bold text-lg">{recipe.title}</span>
                                        <span className="text-gray-600"> ({recipe.description})</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
    
}