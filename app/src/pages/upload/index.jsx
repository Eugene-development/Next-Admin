import axios from '@/lib/axios'
import { useState } from 'react'

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState();

    function handleFileChange(event) {
        setSelectedFile(event.target.files[0]);
    }
    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.post('http://localhost:8002/upload-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Загрузить файл</button>
    </form>

  );
};
export default Upload;
