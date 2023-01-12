import axios from '@/lib/axios'

export const useImage = () => {
    const sendImageToBucket = async cropData => {
        const formData = new FormData()
        formData.append('image', cropData)
        const response = await axios.post(
            'https://larux.ru:7741/upload-image',
            // 'http://localhost:8002/upload-image',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        )
        const hashNameImage = response.data
        return hashNameImage
    }

    return {
        sendImageToBucket,
    }
}
// export const useImage = () => {
//     const sendImage = cropData => {
//         const data = new FormData()
//         data.append('image', cropData)
//         // axios.post('https://larux.ru:7741/upload-image', formData)
//         axios.post(
//             'http://localhost:8002/upload-image',
//             { data },
//             {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             },
//         )
//         // console.log('Uploading image')
//     }

//     return {
//         sendImage,
//     }
// }
