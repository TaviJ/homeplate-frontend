import { useState } from "react"


const CommentForm = ({handleAddComment}) =>{

    const [formData, setFormData]= useState({text: ""});

    const handleChange=(evt)=>{
        setFormData({...formData, [evt.target.name]: evt.target.value})

    }

    const handleSubmit = (evt)=>{
        evt.preventDefault();

        handleAddComment(formData)
        setFormData({text:""})

    }

    return (
        <form onSubmit ={handleSubmit} >
            <label htmlFor="text">Your comment</label>
            <textarea
                required
                type="text"
                id="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
            />
            <button type="submit"> Submit comment</button>
        </form>
    )

}

export default CommentForm