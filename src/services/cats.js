import axios from 'axios'
const baseUrl = 'https://api.thecatapi.com/v1/'
const api_key = process.env.REACT_APP_CAT_API_KEY

const getAll = (page = 0) => {
    const request = axios.get(`${baseUrl}images/search?order=asc&has_breeds=1&page=${page}&limit=20`,
        {
            headers: {
                'Content-type': 'application/json',
                'x-api-key': api_key
            }
        }
    )
    return request.then(response => response)
}

const addToFavorites = id => {
    const request = axios.post(`${baseUrl}favourites`, { 'image_id': id },
        {
            headers: {
                'Content-type': 'application/json',
                'x-api-key': api_key
            }
        }
    )
    return request.then(response => response.data)
}

const uploadImage = formData => {
    const request = axios.post(`${baseUrl}images/upload`, formData,
        {
            headers: {
                'Content-type': 'multipart/form-data',
                'x-api-key': api_key
            }
        }
    )
    return request.then(response => response.data)
}

const deleteFromFavorites = id => {
    const request = axios.delete(`${baseUrl}favourites/${id}`,
        {
            headers: {
                'Content-type': 'application/json',
                'x-api-key': api_key
            }
        }
    )
    return request.then(response => response.data)
}

const getFavorites = () => {
    const request = axios.get(`${baseUrl}favourites`,
        {
            headers: {
                'Content-type': 'application/json',
                'x-api-key': api_key
            }
        }
    )
    return request.then(response => response.data)
}

const getBreeds = () => {
    const request = axios.get(`${baseUrl}breeds?page=0&limit=100`,
        {
            headers: {
                'Content-type': 'application/json',
                'x-api-key': api_key
            }
        }
    )
    return request.then(response => response.data)
}

const getBreed = id => {
    const request = axios.get(`${baseUrl}images/search?format=json&limit=25&breed_id=${id}`,
        {
            headers: {
                'Content-type': 'application/json',
                'x-api-key': api_key
            }
        }
    )
    return request.then(response => response.data)
}

export default {
    getAll,
    addToFavorites,
    getFavorites,
    deleteFromFavorites,
    uploadImage,
    getBreeds,
    getBreed,
}