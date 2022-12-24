import axios from "axios";

const reverseGeocoding = async function (coords, results, setReceiver) {
  try {
    const options = {
      method: "GET",
      url: "https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse",
      params: {
        lat: coords[0],
        lon: coords[1],
        "accept-language": "en",
        polygon_threshold: "0.0",
      },
      headers: {
        "X-RapidAPI-Key": "334d0a9dc1msh6a5a4a0288659d1p127ae2jsnfada8c95af74",
        "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    results.push(response.data);
    setReceiver(true);
  } catch (err) {
    console.error(err);
  }
};

export default reverseGeocoding;
