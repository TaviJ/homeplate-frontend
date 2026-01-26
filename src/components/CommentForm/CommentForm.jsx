import { useState } from "react"


const CommentForm = ({ initialText = "", onSubmit, submitLabel = "Submit" }) =>{
    
    const [formData, setFormData]= useState({text: initialText});
    
    const handleChange=(evt)=>{
        setFormData({...formData, [evt.target.name]: evt.target.value})

    }
    const handleSubmit = (evt)=>{
        evt.preventDefault();
        onSubmit(formData);
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
            <button type="submit"> {submitLabel}</button>
        </form>
    )

}

export default CommentForm