import React, { useState, useEffect } from 'react'
import catService from './services/cats'
import './App.css'
import Button from './components/Button'
import Card from './components/Card'
import FavoriteCard from './components/FavoriteCard'
import Header from './components/Header'
import PopUp from './components/PopUp'
import UploadForm from './components/UploadForm'
import Filter from './components/Filter'

const App = () => {
  const [cats, setCats] = useState([])
  const [favorites, setFavorites] = useState([])
  const [view, setView] = useState({
    viewAll: true, viewFavorites: false, viewUploadForm: false
  })
  const [upload, setUpload] = useState({ url: '', inProgress: false })
  const [breeds, setBreeds] = useState([])
  const [popUp, setPopUp] = useState({
    visible: false,
    id: null,
    url: null,
    life_span: null,
    origin: null,
    intelligence: null,
    name: null,
    description: null,
    affection_level: null,
    child_friendly: null,
    dog_friendly: null
  })

  useEffect(() => {
    catService
      .getRandom()
      .then(response => {
        //console.log(response.data)
        setCats(response.data)
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    catService
      .getFavorites()
      .then(response => {
        //console.log(response.data)
        setFavorites(response.data)
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  useEffect(() => {
    catService
      .getBreeds()
      .then(response => {
        //console.log(response.data)
        const breeds = response.data.map(breed => { return { value: breed.id, label: breed.name } })
        setBreeds(breeds)
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  const toggleFavorite = (id, btnText) => {
    if (btnText === 'Favorite') {
      catService
        .addToFavorites(id)
        .then(response => {
          //console.log(response.data)
          return catService.getFavorites()
        })
        .then(response => {
          //console.log(response.data)
          setFavorites(response.data)
        })
        .catch(error => {
          console.log(error);
        })
    }

    if (btnText === 'Unfavorite') {
      const favorite = favorites.find(f => f.image.id === id)
      catService
        .deleteFromFavorites(favorite.id)
        .then(response => {
          //console.log(response.data)
          return catService.getFavorites()
        })
        .then(response => {
          //console.log(response.data)
          setFavorites(response.data)
        })
        .catch(error => {
          console.log(error);
        })

    }
  }

  const viewAllCats = () => {
    setUpload({ url: '', inProgress: false })
    setView({ viewAll: true, viewFavorites: false, viewUploadForm: false })
  }

  const viewFavorites = () => {
    setUpload({ url: '', inProgress: false })
    setView({ viewAll: false, viewFavorites: true, viewUploadForm: false })
  }

  const viewUploadForm = () => {
    setUpload({ url: '', inProgress: false })
    setView({ viewAll: false, viewFavorites: false, viewUploadForm: true })
  }

  const togglePopUp = id => {
    setPopUp({ ...popUp, visible: false })
    if (typeof id === 'string') {
      const cat = cats.find(c => c.id === id)
      const { url } = cat
      const { name, description, life_span, origin, intelligence, affection_level, child_friendly, dog_friendly } = cat.breeds[0]
      setPopUp({
        visible: true,
        id: id,
        url: url,
        life_span: life_span,
        intelligence: intelligence,
        origin: origin,
        name: name,
        description: description,
        affection_level: affection_level,
        child_friendly: child_friendly,
        dog_friendly: dog_friendly
      })
    }
  }

  const onFileUpload = formData => {
    setUpload({ url: '', inProgress: true })
    catService
      .uploadImage(formData)
      .then(response => {
        //console.log(response.data)
        setUpload({ url: response.data.url, inProgress: false })
      })
      .catch(error => {
        console.log(error);
      })
  }

  const onFilter = breed => {
    console.log('searching for: ', breed.value)
    catService
      .getBreed(breed.value)
      .then(response => {
        //console.log(response.data)
        setCats(response.data)
      })
      .catch(error => {
        console.log(error);
      })
  }

  const favoriteCheck = id => (favorites.find(f => f.image_id === id) ) ? 'Unfavorite' : 'Favorite'
  

  //console.log(favoriteCheck(cats[0].id))

  return (
    <div className="flex-container">
      <Header text={'Cat Browser by Thomas Nylund'} />
      <div className="flex-container-buttons">
        <Button text={'See All Cats'} handleClick={viewAllCats} />
        <Button text={'My Favorites'} handleClick={viewFavorites} />
        <Button text={'Upload Cat Image'} handleClick={viewUploadForm} />
      </div>
      {view.viewAll &&
        <Filter breeds={breeds} handleClick={onFilter} />
      }
      <div className="flex-container-list">
        {view.viewAll &&
          cats.map(cat => {
            return <Card key={cat.id} cat={cat}
              favorites={favorites}
              handleFavoriteClick={toggleFavorite}
              handleImageClick={togglePopUp}
              btnText={favoriteCheck(cat.id)} 
            />
          }
          )
        }
        {popUp.visible &&
          <PopUp favorites={favorites}
            popUp={popUp}
            handleFavoriteClick={toggleFavorite}
            handleCloseClick={togglePopUp} />
        }
        {view.viewFavorites &&
          favorites.map(favorite =>
            <FavoriteCard key={favorite.id}
              favorite={favorite}
              handleFavoriteClick={toggleFavorite}
              handleImageClick={togglePopUp} />
          )
        }
        {view.viewUploadForm &&
          <UploadForm uploadUrl={upload.url}
            uploadInProgress={upload.inProgress}
            handleFileUpload={onFileUpload} />
        }
      </div>
    </div>
  )
}

export default App;
