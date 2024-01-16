const app = require('express')()
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()


var corsOptions = {
    origin:['http://localhost:3000']
}

app.use(cors(corsOptions))

app.get('/',(req,res) => {
    res.send('server is live')
})

app.get('/city/:city',async (req,res) => {

    const {city} = req.params

    try
    {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`)
        return res.json({
            error:false,
            message:'Successfully retrieved data',
            data:response.data
        })
    }
    catch(err){
        if(err.response.data.cod === '404')
        {
            return res.json({
            error:true,
            message:'City does not exist',
            data:[] })
        }
        return res.json({
            error:true,
            message:'An error has occured ',
            data:[] })
    }
})


app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`);
})