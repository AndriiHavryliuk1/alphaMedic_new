const https = require('https');

exports.getAllCountries = () => {
    const options = {
        headers: {
            "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
	        "x-rapidapi-key": "77440f08bbmsh355c928dcca7a9ap1f4564jsn00dea8cc4f78"
        }
      };


    return new Promise((resolve, reject) => {
        https.get('https://restcountries-v1.p.rapidapi.com/all', options, (resp) => {
            let data = '';
    
            try {
          
                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                  data += chunk;
                });
              
                // The whole response has been received. Print out the result.
                return resp.on('end', () => {
                    return resolve(JSON.parse(data))
                });
            } catch (err) {
                reject(err);
            }
          
          }).on("error", (err) => {
            reject(err);
          });
    });
}

exports.getAllCountries = () => {
    const options = {
        headers: {
            "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
	        "x-rapidapi-key": "77440f08bbmsh355c928dcca7a9ap1f4564jsn00dea8cc4f78"
        }
      };


    return new Promise((resolve, reject) => {
        https.get('https://restcountries-v1.p.rapidapi.com/all', options, (resp) => {
            let data = '';
    
            try {
          
                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                  data += chunk;
                });
              
                // The whole response has been received. Print out the result.
                return resp.on('end', () => {
                    return resolve(JSON.parse(data))
                });
            } catch (err) {
                reject(err);
            }
          
          }).on("error", (err) => {
            reject(err);
          });
    });
}