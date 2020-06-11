// This is the code that was in the git "boilerplate"

/*const fetch = require('node-fetch');
const generateWebAppURL = require('server/utils').generateWebAppURL;

module.exports = (app) => {

  app.post('/search-location-weather', (req, res) => {
    const requestBody = req.body;
    const apiUrl = generateWebAppURL(requestBody.locationType, requestBody.locationData);

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        res.send({ data });
      })
      .catch(err => {
        res.redirect('/error');
      });
  });
};*/

const fetch = require('node-fetch');

module.exports = (app) => {

  let zipcode;

  app.post('/search-location', (req, res) => {
    zipcode = req.body.zipcode;

    if(!zipcode || zipcode.length < 5 || zipcode.length > 5) {
      res.redirect('/error');
    } else {
      res.redirect('/current-weather');
    }
  })

  app.get('/search-location-weather', (req, res) => {
    //build api url with user zip
    const baseUrl = 'http://api.openweathermap.org/data/2.3/weather?zip=';
    const apiId = '&apiid=edc58a5020debff94470ae533c01ce3f&units=imperial';

    const userLocation = (url1, url2, zipcode) => {
      let newUrl = url1 + zipcode + url2;
      return newUrl;
    };

    const apiUrl = usrLocation(baseUrl, apiId, zipcode);

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        res.send({ data });
      })

      .catch(err => {
        res.redirect('/error');
      });
  })
}