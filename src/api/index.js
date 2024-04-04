import axios from 'axios';


export const getPlacesData = async (type, sw, ne) => {
  try {
    // const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
    //   params: {
    //     bl_latitude: sw.lat,
    //     tr_latitude: ne.lat,
    //     bl_longitude: sw.lng,
    //     tr_longitude: ne.lng,
    //   },
    let url;
    if (type === 'hotels') {
        url = 'https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary';
    } else {
        url = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;
    }

    const { data: { data } }= await axios.get(url, {
        params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
        },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY ,
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    });
    // console.log(response.data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

