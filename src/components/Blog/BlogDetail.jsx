import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const BlogDetail = () => {
    const [currentBlog, setCurrentBlog] = useState({})

    const { blogId } = useParams()
    const navigate = useNavigate()

    const fetchCurrentBlog = async () => {
        const response = await fetch(`https://quick-cooks-api-7qoji.ondigitalocean.app/blogs/${blogId}`, {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
            }
        })
        const blog = await response.json()
        setCurrentBlog(blog)
    }
    
    const handleClick = () => {
        navigate("/bloglist")
    }

    useEffect(() => {
        fetchCurrentBlog()
    }, [])

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
            {currentBlog.blog_pic && (
                <img
                    src={currentBlog.blog_pic}
                    alt="Blog-Img"
                    className="max-h-96 w-full object-contain mb-4 rounded-lg"
                />
            )}
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{currentBlog.title}</h1>
                <p className="text-gray-700">{currentBlog.article}</p>
            </div>
            <button
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-black 
                hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleClick}
            >
                Back to Blog
            </button>
        </div>
    )
}