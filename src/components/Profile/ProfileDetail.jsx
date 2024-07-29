import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const ProfileDetail = () => {
    const [currentUserDetails, setCurrentUserDetails] = useState({})
    const { profileId } = useParams()
    const navigate = useNavigate()

    const fetchCurrentUserDetails = async () => {
        const response = await fetch(`http://localhost:8000/customers/${profileId}`, {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
            }
        })
        const recipe = await response.json()
        setCurrentUserDetails(recipe)
    }

    const handleEditProfile = () => {
        navigate(`/editProfile/${profileId}`)
    }

    const handleMyRecipes = () => {
        navigate(`/myRecipeList`)
    }

    useEffect(() => {
        fetchCurrentUserDetails()
    }, [])


    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Address:</span>
                    <span className="text-gray-700">{currentUserDetails.address}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Phone Number:</span>
                    <span className="text-gray-700">{currentUserDetails.phone_number}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Username:</span>
                    <span className="text-gray-700">{currentUserDetails.user?.username}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Email:</span>
                    <span className="text-gray-700">{currentUserDetails.user?.email}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">First Name:</span>
                    <span className="text-gray-700">{currentUserDetails.user?.first_name}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">Last Name:</span>
                    <span className="text-gray-700">{currentUserDetails.user?.last_name}</span>
                </div>
            </div>
            <div className="mt-6 flex space-x-4">
                <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-black 
                    hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleEditProfile}
                >
                    Edit Profile
                </button>
                <button
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-black
                    hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleMyRecipes}
                >
                    My Recipes
                </button>
            </div>
        </div>
    )
}