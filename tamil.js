const mysql = require('mysql');
const scraper = require('table-scraper');
const url = 'https://en.wikipedia.org/wiki/List_of_districts_of_Tamil_Nadu';
var con = mysql.createConnection({
    host: "localhost",
    user: "mohan",
    password: "peace",
    database: "ngo"
  });
const states = [{"code": "AN","name": "Andaman and Nicobar Islands"},
{"code": "AP","name": "Andhra Pradesh"},
{"code": "AR","name": "Arunachal Pradesh"},
{"code": "AS","name": "Assam"},
{"code": "BR","name": "Bihar"},
{"code": "CG","name": "Chandigarh"},
{"code": "CH","name": "Chhattisgarh"},
{"code": "DH","name": "Dadra and Nagar Haveli"},
{"code": "DD","name": "Daman and Diu"},
{"code": "DL","name": "Delhi"},
{"code": "GA","name": "Goa"},
{"code": "GJ","name": "Gujarat"},
{"code": "HR","name": "Haryana"},
{"code": "HP","name": "Himachal Pradesh"},
{"code": "JK","name": "Jammu and Kashmir"},
{"code": "JH","name": "Jharkhand"},
{"code": "KA","name": "Karnataka"},
{"code": "KL","name": "Kerala"},
{"code": "LD","name": "Lakshadweep"},
{"code": "MP","name": "Madhya Pradesh"},
{"code": "MH","name": "Maharashtra"},
{"code": "MN","name": "Manipur"},
{"code": "ML","name": "Meghalaya"},
{"code": "MZ","name": "Mizoram"},
{"code": "NL","name": "Nagaland"},
{"code": "OR","name": "Odisha"},
{"code": "PY","name": "Puducherry"},
{"code": "PB","name": "Punjab"},
{"code": "RJ","name": "Rajasthan"},
{"code": "SK","name": "Sikkim"},
{"code": "TN","name": "Tamil Nadu"},
{"code": "TS","name": "Telangana"},
{"code": "TR","name": "Tripura"},
{"code": "UK","name": "Uttarakhand"},
{"code": "UP","name": "Uttar Pradesh"},
{"code": "WB","name": "West Bengal"}]
  con.connect(function(err) {
    if (err) {
        console.log(err)
    }

   /*  states.map(item=>{
        let statement = `INSERT INTO states (state_name,state_code) VALUES("${(item['name'])}","${item['code']}")`
        console.log(statement)
        con.query(statement,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                console.log(result)
            }
        })
    }) */

    let districts = []
    let selectdist = 'Select * from districts'

    con.query(selectdist,(err,result)=>{
        result.forEach(element => {
            districts.push({
                id:element['id'],
                name:element['name']
            })
        });
        scraper
        .get(url)
        .then(tabledata=>{
            tabledata[1].map(item=>{
                /* for(let i in districts){
                    if(districts[i].name === item['Map']){
                        let values = item['9']
                        console.log("District = "+districts[i].name)
                        let taluks = (values.split("\n"))
                    }
                }*/
                const value = districts.find((element,index,array)=>{
                    return element.name === item['Map']
            }) 
            
                const taluks = item['9'].split('\n')
                taluks.forEach(element=>{
                    let statement = `insert into taluks (districtId,name) values(${value['id']},"${element}")`
                    con.query(statement,(err,result)=>{
                        if(err){
                            console.log(err)
                        }else{
                            console.log(result)
                        }
                    })
                })
            
            })
        })
    })
    
    /* scraper
    .get(url)
    .then(tabledata=>{
        tabledata[1].map(item=>{
            let statement = `INSERT INTO districts (stateId,name) VALUES(31,"${item['Map']}")`
        con.query(statement,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                console.log(result)
            }
        })
        })
    }) */

  });
/* scraper
  .get(url)
  .then(function(tableData) {
    tableData[1].map(item=>{
        console.log("Districts = "+item['Map'])
        
    })
  }); */