// Load the libraries Express, Fetch, DotEnv

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const fetch = require('node-fetch')
const app = express()
const port = 3000

app.use(express.static('public'))
console.log(process.env)

// Create a GET endpoint for /babynames and receive the three words from the input fields

// Fetch the API Key

const api_key = process.env.API_KEY

app.get('/babynames/first/:first/second/:second/third/:third', async(request, response) => {
    let prompt = 'Suggest baby names derived from the words ' + request.params.first + ', ' + request.params.second + ', and ' + request.params.third

    // Create a back-end POST API request for OpenAI's Text Completion endpoint

    const completion_api = await fetch('https://api.openai.com/v1/completions', 
    {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+api_key
    },
    body: JSON.stringify({
        'model': 'text-davinci-002',
        'prompt': prompt,
        'temperature': 0,
        "max_tokens": 500
    })
})

// Retrieve the API response

const completion_api_response = await completion_api.json()
response.json(completion_api_response)

})

// Initialize server

app.listen(port, () => {
  console.log(`Baby Names App listening at http://localhost:${port}`)
})