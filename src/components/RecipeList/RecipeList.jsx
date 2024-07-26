import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'


export const RecipeList = () => {
    const [allRecipes, setAllRecipes] = useState([])
    const [searchText, setSearchText] = useState("")
    const [selectedOption, setSelectedOption] = useState("")

    const fetchAllRecipes = async () => {
        const response = await fetch(`http://localhost:8000/recipes`, {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
            }
        })
        const recipes = await response.json()
        setAllRecipes(recipes)
    }

    const fetchSearchedRecipes = async () => {
        const response = await fetch(`http://localhost:8000/recipes?q=${searchText}`, {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
            }
        })
        const recipes = await response.json()
        setAllRecipes(recipes)
    }

    const fetchSelectedRecipes = async () => {
        if (selectedOption !== "")
            {const response = await fetch(`http://localhost:8000/recipes?orderby=${selectedOption}`, {
                headers: {
                    Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
                }
            })
            const recipes = await response.json()
            setAllRecipes(recipes)}
        else {fetchAllRecipes()}
    }

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
        <div className="recipelist-container">
            <div className="flex justify-start items-center w-[92%] mx-auto">
                <div>
                    <input 
                        type="text"
                        name="search"
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                        placeholder="Search"
                        className="border-2 border-gray-600 p-2 mr-2 border-solid bg-gray-200 rounded-full"
                    />
                </div>
                <div>
                    <select className="border-2 border-gray-600 p-2 border-solid bg-gray-200 rounded-full min-w-[30vh]" value={selectedOption} onChange={(event) => {setSelectedOption(event.target.value)}}>
                        <option value="">Select an option</option>
                        <option value="time">Time</option>
                        <option value="title">Title</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                    allRecipes.map(recipe => <div key={`key-${recipe.id}`} className="border p-5 border-solid hover:bg-gray-600 hover:text-white rounded-md border-black mt-5 bg-slate-50">
                        <div>
                            <Link to={`/recipeDetails/${recipe.id}`}>
                                <div>{recipe.title} ({recipe.description})</div>
                            </Link>
                        </div>
                     </div>)
                }
            </div>
        </div>
    )
}