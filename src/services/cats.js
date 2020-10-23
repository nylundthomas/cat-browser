import axios from 'axios'
const baseUrl = 'https://api.thecatapi.com/v1/'

const getRandom = () => {
    return axios.get(`${baseUrl}images/search?limit=25&has_breeds=true&format=json`,
        {
            headers: {
                'Content-type': 'application/json',
                'x-api-key': process.env.REACT_APP_CAT_API_KEY 
            }
        }
    )
}

const getOne = id => {
    return axios.get(`${baseUrl}images/${id}`,
        {
            headers: {
                'Content-type': 'application/json',
                'x-api-key': process.env.REACT_APP_CAT_API_KEY
            }
        }
    )
}

const addToFavorites = id => {
    return axios.post(`${baseUrl}favourites`, { 'image_id': id },
        {
            headers: {
                'Content-type': 'application/json',
                'x-api-key': process.env.REACT_APP_CAT_API_KEY
            }
        }
    )
}

const uploadImage = formData => {
    return axios.post(`${baseUrl}images/upload`, formData,
        {
            headers: {
                'Content-type': 'multipart/form-data',
                'x-api-key': process.env.REACT_APP_CAT_API_KEY
            }
        }
    )
}

const deleteFromFavorites = id => {
    return axios.delete(`${baseUrl}favourites/${id}`,
        {
            headers: {
                'Content-type': 'application/json',
                'x-api-key': process.env.REACT_APP_CAT_API_KEY
            }
        }
    )
}

const getFavorites = () => {
    return axios.get(`${baseUrl}favourites`,
        {
            headers: {
                'Content-type': 'application/json',
                'x-api-key': process.env.REACT_APP_CAT_API_KEY
            }
        }
    )
}

const getBreeds = () => {
    return axios.get(`${baseUrl}breeds?page=0&limit=100`,
        {
            headers: {
                'Content-type': 'application/json',
                'x-api-key': process.env.REACT_APP_CAT_API_KEY
            }
        }
    )
}

const getBreed = id => {
    return axios.get(`${baseUrl}images/search?format=json&limit=25&breed_id=${id}`,
        {
            headers: {
                'Content-type': 'application/json',
                'x-api-key': process.env.REACT_APP_CAT_API_KEY
            }
        }
    )
}

export default {
    getRandom: getRandom,
    getOne: getOne,
    addToFavorites: addToFavorites,
    getFavorites: getFavorites,
    deleteFromFavorites: deleteFromFavorites,
    uploadImage: uploadImage,
    getBreeds: getBreeds,
    getBreed: getBreed,
}