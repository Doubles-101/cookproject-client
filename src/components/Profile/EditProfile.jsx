import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"


export const EditProfile = () => {
    const [currentUserDetails, setCurrentUserDetails] = useState({})
    const [formData, setFormData] = useState({
        address: currentUserDetails.address,
        phone_number: currentUserDetails.phone_number,
        username: currentUserDetails.user?.username,
        email: currentUserDetails.user?.email,
        first_name: currentUserDetails.user?.first_name,
        last_name: currentUserDetails.user?.last_name,
      })

    const { profileId } = useParams()
    const navigate = useNavigate()

    const fetchCurrentUserDetails = async () => {
        const response = await fetch(`https://quick-cooks-api-7qoji.ondigitalocean.app/customers/${profileId}`, {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
            }
        })
        const recipe = await response.json()
        setCurrentUserDetails(recipe)
    }
    
    const updateCurrentUserDetails = async () => {
        const response = await fetch(`https://quick-cooks-api-7qoji.ondigitalocean.app/customers/${profileId}`, {
            method: "PUT",
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const recipe = await response.json()
        setCurrentUserDetails(recipe)
    }
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateCurrentUserDetails()
        navigate(`/profile/${profileId}`)
    }

    useEffect(() => {
        fetchCurrentUserDetails()
    }, [])

    useEffect(() => {
        setFormData({
            address: currentUserDetails.address,
            phone_number: currentUserDetails.phone_number,
            username: currentUserDetails.user?.username,
            email: currentUserDetails.user?.email,
            first_name: currentUserDetails.user?.first_name,
            last_name: currentUserDetails.user?.last_name,
        })
    }, [currentUserDetails])

    
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
            </div>
            <form onSubmit={handleSubmit} className="">
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold m-2">Address:</label>
                    <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold m-2">Phone Number:</label>
                    <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold m-2">Username:</label>
                    <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold m-2">Email:</label>
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold m-2">First Name:</label>
                    <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold m-2">Last Name:</label>
                    <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" className="w-full bg-black text-white py-2 rounded-full mt-4 hover:bg-blue-600 transition duration-300">
                    Submit
                </button>
            </form>
        </div>
    )
}