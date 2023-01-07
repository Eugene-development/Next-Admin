import axios from '@/lib/axios'

export const useImage = () => {
    const sendImage = formData =>
        // axios.post('https://larux.ru:7741/upload-image', formData)
        axios.post('http://localhost:8002/upload-image', formData)
    // console.log('Uploading image')

    return {
        sendImage,
    }
}
