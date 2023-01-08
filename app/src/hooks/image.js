import axios from '@/lib/axios'

export const useImage = () => {
    const sendImage = cropData => {
        const data = new FormData()
        data.append('image', cropData)
        // axios.post('https://larux.ru:7741/upload-image', formData)
        axios.post(
            'http://localhost:8002/upload-image',
            { data },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        )
        // console.log('Uploading image')
    }

    return {
        sendImage,
    }
}
