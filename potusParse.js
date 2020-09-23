const rp = require('request-promise');
const $ = require('cheerio');

const potusParse = function(url) {
    print(url)
  return rp(url)
    .then(function(html) {
        print(html)
      return {
        name: $('.firstHeading', html).text(),
        birthday: $('.bday', html).text(),
      };
    })
    .catch(function(err) {
        console.log(err)
      //handle error
    });
};

module.exports = potusParse;