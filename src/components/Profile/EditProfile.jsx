import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


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

    const fetchCurrentUserDetails = async () => {
        const response = await fetch(`http://localhost:8000/customers/${profileId}`, {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
            }
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
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
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
        <form onSubmit={handleSubmit}>
      <div>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Phone Number:
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
    )
}