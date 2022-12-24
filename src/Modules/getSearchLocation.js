import axios from "axios";

const getSearchLocation = function (query, setState) {
  const data = {
    coords: [],
    name: "",
    id: 0,
  };
  const options = {
    method: "GET",
    url: "https://forward-reverse-geocoding.p.rapidapi.com/v1/search",
    params: {
      q: query,
      "accept-language": "en",
      polygon_threshold: "0.0",
    },
    headers: {
      "X-RapidAPI-Key": "334d0a9dc1msh6a5a4a0288659d1p127ae2jsnfada8c95af74",
      "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      data.coords.push(response.data[0].lat, response.data[0].lon);
      data.name = response.data[0].display_name;
      data.id = response.data[0].place_id;
      console.log(data);
      setState(data);
    })

    .catch(function (error) {
      console.error(error);
    });
};
export default getSearchLocation;
