import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const ProfileDetail = () => {
    const [currentUserDetails, setCurrentUserDetails] = useState({})
    const { profileId } = useParams()

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
        
    }

    useEffect(() => {
        fetchCurrentUserDetails()
    }, [])


    return (
        <div>
            <div>Profile</div>
                <div>
                    <div>Address:  {currentUserDetails.address}</div>
                    <div>Phone Number:  {currentUserDetails.phone_number}</div>
                    <div>Username:  {currentUserDetails.user?.username}</div>
                    <div>Email:  {currentUserDetails.user?.email}</div>
                    <div>First Name:  {currentUserDetails.user?.first_name}</div>
                    <div>Last Name:  {currentUserDetails.user?.last_name}</div>
                </div>
            <div><button className="button bg-blue-500" onClick={handleEditProfile}>Edit Profile</button></div>
        </div>
    )
}