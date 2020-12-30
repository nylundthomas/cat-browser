import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate'
import catService from "./services/cats";
import "./App.css";
import Button from "./components/Button";
import Card from "./components/Card";
import FavoriteCard from "./components/FavoriteCard";
import Header from "./components/Header";
import PopUp from "./components/PopUp";
import UploadForm from "./components/UploadForm";
import Filter from "./components/Filter";

const App = () => {
  const [pagination, setPagination] = useState({
    page: '',
    limit: '',
    count: ''
  });
  const [cats, setCats] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [view, setView] = useState({
    viewAll: true,
    viewFavorites: false,
    viewUploadForm: false,
  });
  const [upload, setUpload] = useState({ url: "", inProgress: false });
  const [breeds, setBreeds] = useState([]);
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
    dog_friendly: null,
  });
  const [btnDisabled, setBtnDisabled] = useState(false)

  useEffect(() => {
    catService
      .getAll()
      .then(response => {
        //console.log(response.data)
        setCats(response.data);
        setPagination({
          currentPage: response.headers['pagination-page'],
          perPageLimit: response.headers['pagination-limit'],
          pageCount: (response.headers['pagination-count'] / response.headers['pagination-limit']),
        })
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    catService
      .getFavorites()
      .then(allFavorites => {
        //console.log(allFavorites)
        setFavorites(allFavorites);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    catService
      .getBreeds()
      .then(allOfBreed => {
        //console.log(allOfBreed)
        const breeds = allOfBreed.map((breed) => {
          return { value: breed.id, label: breed.name };
        });
        setBreeds(breeds);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const toggleFavorite = (id, btnText) => {

    if (btnText === "Favorite") {
      catService
        .addToFavorites(id)
        .then(message => {
          //console.log(message)
          return catService.getFavorites();
        })
        .then(allFavorites => {
          //console.log(allFavorites)
          setFavorites(allFavorites);
          setBtnDisabled(false)
        })
        .catch(error => {
          console.log(error);
        });
    }

    if (btnText === "Unfavorite") {
      const favorite = favorites.find((f) => f.image.id === id);
      catService
        .deleteFromFavorites(favorite.id)
        .then(message => {
          //console.log(message)
          return catService.getFavorites();
        })
        .then(allFavorites => {
          //console.log(allFavorites)
          setFavorites(allFavorites);
          setBtnDisabled(false)
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const viewAllCats = () => {
    setUpload({ url: "", inProgress: false });
    setView({ viewAll: true, viewFavorites: false, viewUploadForm: false });
    
    catService
      .getAll()
      .then(response => {
        //console.log(response.data)
        setCats(response.data);
        setPagination({
          currentPage: response.headers['pagination-page'],
          perPageLimit: response.headers['pagination-limit'],
          pageCount: (response.headers['pagination-count'] / response.headers['pagination-limit']),
        })
      })
      .catch(error => {
        console.log(error);
      });
  };

  const viewFavorites = () => {
    setUpload({ url: "", inProgress: false });
    setView({ viewAll: false, viewFavorites: true, viewUploadForm: false });
  };

  const viewUploadForm = () => {
    setUpload({ url: "", inProgress: false });
    setView({ viewAll: false, viewFavorites: false, viewUploadForm: true });
  };

  const togglePopUp = (id) => {
    setPopUp({ ...popUp, visible: false });
    if (typeof id === "string") {
      const cat = cats.find((c) => c.id === id);
      const { url } = cat;
      const {
        name,
        description,
        life_span,
        origin,
        intelligence,
        affection_level,
        child_friendly,
        dog_friendly,
      } = cat.breeds[0];
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
        dog_friendly: dog_friendly,
      });
    }
  };

  const onFileUpload = (formData) => {
    setUpload({ url: "", inProgress: true });
    catService
      .uploadImage(formData)
      .then(imageObject => {
        //console.log(imageObject)
        setUpload({ url: imageObject.url, inProgress: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onFilter = (breed) => {
    console.log("searching for: ", breed.value);
    catService
      .getBreed(breed.value)
      .then(response => {
        console.log(response)
        setCats(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const favoriteCheck = (id) => favorites.find((f) => f.image_id === id) ? "Unfavorite" : "Favorite";

  const handlePageClick = ({ selected }) => {
    console.log(selected)
    catService
      .getAll(selected)
      .then(response => {
        console.log(response.data)
        setCats(response.data);
        setPagination({
          currentPage: response.headers['pagination-page'],
          perPageLimit: response.headers['pagination-limit'],
          pageCount: (response.headers['pagination-count'] / response.headers['pagination-limit']),
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="flex-container">
      <Header text={"Cat Browser by Thomas Nylund"} />
      <div className="flex-container-buttons">
        <Button text={"See All Cats"} handleClick={viewAllCats} />
        <Button text={"My Favorites"} handleClick={viewFavorites} />
        <Button text={"Upload Cat Image"} handleClick={viewUploadForm} />
      </div>
      {view.viewAll && <Filter breeds={breeds} handleClick={onFilter} />}
      <div className="flex-container-list">
        {view.viewAll &&
          cats.map(cat => {
            if (cat.breeds[0]) {
              return (
                <Card
                  disableBtn={setBtnDisabled}
                  disabled={btnDisabled}
                  key={cat.id}
                  cat={cat}
                  favorites={favorites}
                  handleFavoriteClick={toggleFavorite}
                  handleImageClick={togglePopUp}
                  btnText={favoriteCheck(cat.id)}
                />
              );
            }
            return null
          })
        }
        {popUp.visible && (
          <PopUp
            disableBtn={setBtnDisabled}
            disabled={btnDisabled}
            favorites={favorites}
            popUp={popUp}
            handleFavoriteClick={toggleFavorite}
            handleCloseClick={togglePopUp}
          />
        )}
        {view.viewFavorites &&
          favorites.map((favorite) => (
            <FavoriteCard
              disableBtn={setBtnDisabled}
              disabled={btnDisabled}
              key={favorite.id}
              favorite={favorite}
              handleFavoriteClick={toggleFavorite}
              handleImageClick={togglePopUp}
            />
          ))}
        {view.viewUploadForm && (
          <UploadForm
            uploadUrl={upload.url}
            uploadInProgress={upload.inProgress}
            handleFileUpload={onFileUpload}
          />
        )}
      </div>
      { (view.viewAll && cats.length >= 16) &&
        <ReactPaginate
          pageCount={pagination.pageCount}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={3}
          containerClassName={'pagination'}
        />
      }
    </div>
  );
};

export default App;
