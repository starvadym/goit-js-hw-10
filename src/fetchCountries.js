function fetchCountries(name) {
  const URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
      return fetch(URL).then((response) => {
            console.log(response);
      if (!response.ok) {
        throw new Error(response.message);
      }
      return response.json();
    })

};

export { fetchCountries };

