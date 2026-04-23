import axios from 'axios';
import { useState } from 'react';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleUpload = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!file){
        alert('Please select a file to upload.');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await axios.post<{ imageUrl: string }>('http://localhost:3000/api/uploads', formData);
        setImageUrl(response.data.imageUrl);
    } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload image');
    }


  };

  return (
    <div>
      <h2>File Upload</h2>
      <form onSubmit={handleUpload} encType="multipart/form-data">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
        <button type="submit">Upload</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
}
