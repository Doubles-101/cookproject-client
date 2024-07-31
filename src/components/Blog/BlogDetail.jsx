import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export const BlogDetail = () => {
    const [currentBlog, setCurrentBlog] = useState({})

    const { blogId } = useParams()

    const fetchCurrentBlog = async () => {
        const response = await fetch(`http://localhost:8000/blogs/${blogId}`, {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("cook_token")).token}`
            }
        })
        const blog = await response.json()
        setCurrentBlog(blog)
    }

    useEffect(() => {
        fetchCurrentBlog()
    }, [])

    return (
        <>Blog Detail {blogId}</>
    )
}