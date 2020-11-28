const express = require ("express");
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();

const port = process.env.PORT || 3000

app.listen(3000, ()=> {
     console.log("listening at 3000")
});

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}))

app.post('/github', (request, response)  =>{
     console.log('request recieved');

     const option = {
          method: 'POST',
          body: JSON.stringify(request.body),
          headers:{
               'Content-Type': 'application/json',
               Authorization: `Bearer ${process.env.Github_Token}`
          },
     }
     fetch('https://api.github.com/graphql', option)
     .then(res => res.json())
     .then(data => {
          console.log(data);
        return  response.json({data: data})
     })
     
     .catch(err => {
          console.log(err)
      return response.json({error: err})})
})

