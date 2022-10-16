import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import { useState } from 'react';
import axios from "axios";
import location from './location.png'
import clouds from './clouds.png'
import thunder from './thunder.png'
import clear from './clear.png'
import haze from './haze.png'
import smoke from './smoke.png'
import light from './light.png'
import dark from './dark.png'
import humidity from './humidity.png'
import pressure from './pressure.png'
import visibility from './visibility.png'
import temperature from './temperature.png'
import windDirection from './wind.png'
import windSpeed from './windspeed.png'
// import weaherBack from './weatherback.png'















  



const Weather =  () => {


    const [weatherData, setWeatherData] = useState(null)
    const [cityName, setCityName] = useState("")
    const [weatherType, setWeatherType] = useState([])


    
const submitHandler = (e) => {
    e.preventDefault();
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=e0f99c494c2ce394a18cc2fd3f100543`)
        .then(response => {
            console.log("response: ", response.data);
            setWeatherData(response.data);
            setWeatherType(response.data.weather)
        })
        .catch(err => {
            console.log("error: ", err);
        })
}

const [isLit, setLit] = useState(true);

const changeTheme = () => {
    setLit(!isLit)

   
 


}



return (
        <div className={`parent-div ${(isLit)? "lit": "dark"}`}>
            <div className='change-theme'>
                <img src={(isLit)? dark: light} alt="light mode" onClick={changeTheme} title = "Change Theme" className='theme' />

            </div>
            

     

            <form onSubmit={submitHandler}>
                <input type="text" placeholder="Enter City Name" required 
                onChange={(e) => { setCityName(e.target.value) }
                
                
                } />

                <button type="submit">Get Update</button>
            </form>

            {(weatherData === null) ? null :
                <div className='show-data'>
                    
                    <div className='city-name'>
                        <img src={location} alt="location icon" />
                        <p>{weatherData?.name}</p>
                        

                    </div>
                    
                    <div className='weather-type'>
                        {
                            weatherType.map((eachType, i) =>(
                                <div className='weather-type'>
                                    <p>{eachType?.main}</p>
                                        <img src={(eachType?.main === "Clouds")? clouds : ""} alt="" className='clouds'/>
                                        <img src={(eachType?.main === "Thunderstorm")? thunder : ""} alt="" className='clouds'/>
                                        <img src={(eachType?.main === "Clear")? clear : ""} alt="" className='clouds' />
                                        <img src={(eachType?.main === "Haze")? haze : ""} alt="" className='cloud-haze' />
                                        <img src={(eachType?.main === "Smoke")? smoke : ""} alt="" className='cloud-smoke' />
                                </div>

                            ))  
                            
                            
                            
                        }
                        
                        
                    </div>

                    <div className='temp'>
                        
                          <p>{Math.round(weatherData?.main?.temp)}°<sup>C</sup> </p>
                        

                    </div>
                    <div className='merge'>
                    <h4>Atmospheric Conditions</h4>


                    <div className='atmospheric-conditions'>
                        <div className='humidity'>
                            <img src={humidity} alt="humidity icon" height="30" width="30" />
                            <p>Humidity: {weatherData?.main?.humidity}%</p>

                        </div>

                        <div className='pressure'>
                            <img src={pressure} alt="humidity icon" height="30" width="30" />
                            <p>Pressure: {weatherData?.main?.pressure}mb</p>

                        </div>

                        <div className='visibility'>
                            <img src={visibility} alt="humidity icon" height="30" width="30" />
                            <p>Visibility: {weatherData?.visibility}mi</p>

                        </div>

                    </div>
                    <h4>Weather & Wind Conditions</h4>

                    <div className='weather-condition'>
                        <div className='feels-like'>
                            <img src={temperature} alt="" height="40" width="40"/>
                            <p>Feels Like: {Math.round(weatherData?.main?.feels_like)}°C</p>

                        </div>

                        <div className='wind-degree'>
                            <img src={windDirection} alt="" height="40" width="40"/>
                            <p>Wind Direction: {weatherData?.wind?.deg}°</p>

                        </div>

                        <div className='wind-speed'>
                            <img src={windSpeed} alt="" height="40" width="40"/>
                            <p>Wind Speed: {weatherData?.wind?.speed}Km/h</p>

                        </div>


                    </div>
                    </div>


                </div>
            }
        </div>
    );
}




ReactDOM.render(<Weather/>,document.querySelector("#root"));

