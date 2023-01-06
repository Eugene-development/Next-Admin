import axios from '@/lib/axios'

export const useImage = () => {
    const sendImage = () =>
        // axios.post('https://larux.ru:7741/upload-image', formData)
        console.log('Uploading image')

    return {
        sendImage,
    }
}
