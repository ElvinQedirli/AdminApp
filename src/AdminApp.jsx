import React, { useState } from 'react';
import './adminapp.css';

function AdminApp({ onPhotoUpload }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const handleUpload = () => {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("photo", selectedFile);
  
        // API'ye fotoğrafı yükle
        fetch("http://localhost:3000/api/photos", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            // Fotoğraf yükleme başarılıysa ana bileşene haber ver
            if (data.success) {
              onPhotoUpload(data.photo);
              setSelectedFile(null);
            }
          })
          .catch((error) => console.error("Upload Error:", error));
      }
    };
  
    return (
      <div className="AdminPanel">
        <h2>Admin Panel</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handleUpload}>Fotoğrafı Yükle</button>
      </div>
    );
}

export default AdminApp;
