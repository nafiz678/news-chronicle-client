
import axios from "axios";


// Upload image and return image url 
export const imageUpload = async (imageData) => {

    const formData = new FormData()
    formData.append('file', imageData);
    formData.append('upload_preset', 'nafiz_vai_cloudinary');

    const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`, formData)

    return data.secure_url
}


export const saveUser = async (user) => {
    try {
        await axios.post(`https://daily-chronicle-server-side.vercel.app/users/${user?.email}`, {
            name: user?.displayName,
            email: user?.email,
            image: user.photoURL,
        })
    } catch (error) {
        
    }
}
