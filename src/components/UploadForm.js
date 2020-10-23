import React, { useState } from 'react'
import './UploadForm.css'

const UploadForm = ({ uploadUrl, uploadInProgress, handleFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null)

    const onChange = event => {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        setSelectedFile(formData)
    }

    const handleClick = (formData) => {
        handleFileUpload(formData)
        setSelectedFile(null)
        document.getElementById('fileSelector').value = ''
    }
    
    return (
        <div className="uploadForm">
            <div>
                <h3>Upload your own image to the cat database</h3>
            </div>
            <div className="uploadFormMid">
                <div className="uploadFormButtons">
                    <input id="fileSelector" type="file" onChange={onChange} />
                    { selectedFile &&
                        <button onClick={() => handleClick(selectedFile)}>Upload</button>
                    }
                </div>
                <div>
                    { uploadInProgress  &&
                        <p>Uploading file...</p>
                    }
                    { uploadUrl &&
                        <p>Upload successfull</p>
                    }
                </div>
            </div>
            {uploadUrl &&
                <div>
                    <img src={uploadUrl} alt={'Displaying the file that was uploaded'} />
                </div>
            }
        </div>
    )
}

export default UploadForm