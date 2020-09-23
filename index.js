const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';
const potusParse = require('./potusParse')

rp(url)
  .then(function(html){
    //success!
    const wikiurls = []
    for(let i =0;i< 45;i++){
        wikiurls.push($('td > b > a', html)[i].attribs.href)
    }
   // console.log($('td > b > a', html).length);
    //console.log($('td > b > a', html));
   // console.log(wikiurls)

   /*  return Promise.all(
        wikiUrls.map(function(url) {
          return potusParse('https://en.wikipedia.org' + url);
        })
      ); */

      console.log(wikiurls.length)
      wikiurls.map(item=>{
          //console.log(item)
          let url1 = 'https://en.wikipedia.org' + item
          rp(url1).then(html=>{
            console.log($('.firstHeading', html).text())
            console.log($('.bday', html).text(),)
          })
      })
  })
  .catch(function(err){
    //handle error
  });