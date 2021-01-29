const https = require('https');

global.allCountriesCallsCount = 0;

exports.getAllCountries = async (req, res, next) => {
    try {
        if (++global.allCountriesCallsCount % 5 === 0) {
            return next(new Error("Server error"));
        }
        if (req.query.languages) {
            const filtered = await getCountiesByLanguages(req, res, next);
            res.status(200).json(filtered);
        } else {
            const data = await getAllCountries();
            res.status(200).json(data);
        }
    } catch(error) {
        next(error)
    }
};

exports.getAllCountrieCallsCount = (req, res, next) => {
    res.status(200).json(`external-api/countries was invoked ${allCountriesCallsCount} times`);
}

exports.getSomething = async (req, res, next) => {
    const value = Math.random() * 100;
    if (value > 70) {
        res.status(404).json('Not found');
    } else {
        res.status(200).json('success');
    }
};

async function getCountiesByLanguages(req, res, next) {
    const data = await getAllCountries();
    const languages = JSON.parse(req.query.languages);
    if (!Array.isArray(languages)) {
        next(new Error("Not an array!"));
        return;
    }

    const filtered = await asyncFilter(data, asyncFilterByLanguage);

    return filtered;

    async function asyncFilterByLanguage(item) {
        return Promise.resolve(item.languages.some(el => languages.includes(el)));
    }
}


async function asyncFilter(list, callback) {
    const fail = Symbol()
    return (await Promise.all(list.map(async item =>  {
        return (await callback(item)) ? item : fail; 
    }))).filter(i=>i!==fail)
}



function getAllCountries() {
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
