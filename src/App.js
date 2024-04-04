import React,{ useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

const App = () => {

    const [ places, setPlaces ] = useState([]);
    const [ filteredPlaces, setFilteredPlaces] = useState([])

    const [childClicked, setChildClicked] = useState(null)

    const [ coordinates, setCoordinates] = useState({});
    const [bounds, setBounds] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude} }) => {
            setCoordinates({ lat: latitude, lng: longitude });
        })
    }, []);

    useEffect(() => {
      const filteredPlaces = places.filter((place) => place.rating > rating);

      setFilteredPlaces(filteredPlaces);
    },[rating]);

    useEffect(() => {
      if(bounds.sw && bounds.ne){
      setIsLoading(true)

        getPlacesData(type, bounds.sw, bounds.ne)
            .then((data) => {
                setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                setFilteredPlaces([])
                setIsLoading(false);
            })
          }
    }, [type, bounds] );

  return (
    <>
       <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
        
            places={filteredPlaces.length ? filteredPlaces : places}
            // places ={places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8} >
          <Map
            setBounds={setBounds}
            setCoordinates={setCoordinates}
            coordinates={coordinates}
            // places={places}
            setChildClicked={setChildClicked}
            places={filteredPlaces.length ? filteredPlaces : places}
            // weatherData={weatherData} //i have not added weather
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App