import { useState } from 'react'
import axios from 'axios';
import { TiWeatherWindyCloudy } from "react-icons/ti";
import Spinner from './assets/spinner.gif'
import './App.css'

const SERVER = 'http://localhost:5000/city/'

function App() {
  const [query, setQuery] = useState('')
  const [data,setData] = useState()
  const [loading,setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading(true)
    axios.get(SERVER + query)
    .then(res => {
      if(!res.data.error)
      {
        setData(res.data.data);
        setLoading(false);
        
      }
      else
      {
        
        alert(res.data.message)
        setLoading(false)
      }
    })
    .catch(err => {
      
      console.log((err));
      setLoading(false)
    })
  }

  

  return (
    <>
      <div>
          <TiWeatherWindyCloudy size = {60}/>
        
      </div>
      <h1>Open Weather App</h1>
      <div className="card">
        <input onChange={(e) => setQuery(e.target.value)}
              value={query}
              placeholder='Search for a city...' 
              readOnly={loading}
        />
        {/* <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p> */}
      </div>
      <button className='find-btn' onClick={() => handleSubmit()}>
        {
          loading?
          <div className='spinner'>

          <img src={Spinner} alt="" />
          </div>
          :
          'Find'
        }
      </button>
      <div className="output-card">
        <div className='weather-logo'>
          {data?.weather[0].icon ? <img src={`http://openweathermap.org/img/w/${data?.weather[0].icon}.png`} alt=""  /> : ''}
        </div>
        {data?.weather[0].description}
        {/* <div>...</div> */}
      </div>
      
    </>
  )
}

export default App
