import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export const BlogList = () => {
    const [allBlogs, setAllBlogs] = useState([])

    const fetchAllBlogs = async () => {
        const response = await fetch(`https://quick-cooks-api-7qoji.ondigitalocean.app/blogs`, {
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
                            className="border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:shadow-lg hover:-translate-y-1"
                        >
                            <Link to={`/blogDetails/${blog.id}`}>
                                <div className="p-5">
                                    <div className="mb-4">
                                        <img 
                                            src={blog.blog_pic} 
                                            alt={blog.title} 
                                            className="w-full h-48 object-cover rounded-t-lg"
                                        />
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-800 mb-3">{blog.title}</h1>
                                    <p className="text-gray-600">{blog.article.substring(0, 100)}...</p>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}