import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export const BlogList = () => {
    const [allBlogs, setAllBlogs] = useState([])

    const fetchAllBlogs = async () => {
        const response = await fetch(`http://localhost:8000/blogs`, {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
            }
        })
        const blogs = await response.json()
        setAllBlogs(blogs)
    }

    useEffect(() => {
        fetchAllBlogs()
    }, [])

    return (
        <div className="bloglist-container p-6 bg-gray-100 rounded-lg shadow-md m-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {
                    allBlogs.map(blog => (
                        <div 
                            key={`key-${blog.id}`} 
                            className="border p-5 border-solid hover:bg-gray-600 hover:text-white rounded-md border-gray-300 bg-white shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                        >
                            <div>
                                <Link to={`/blogDetails/${blog.id}`}>
                                    <div className="blogitem">
                                        <span className="font-bold text-lg">{blog.title}</span>
                                        <span className="text-gray-600"> ({blog.blog_pic})</span>
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