import React,{useState, useEffect} from 'react'
import logo from './night.svg'
import Navbar from './Navbar'
import {Line} from 'react-chartjs-2'
// eslint-disable-next-line
import {Chart as ChartJS} from 'chart.js/auto'

export default function CheckWeather() {
    const day = {1:'Monday', 2:'Tuesday', 3:'Wednesday', 4:'Thursday', 5:'Friday', 6:'Saturday', 0:'Sunday'}
    //document.body.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2017/12/09/18/24/dawn-3008369_1280.jpg')"
    document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/1355002.jpg')"
    //document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/6738814.jpg')"
    document.body.style.backgroundImage= logo
    const [val, setval] = useState("")
    const [state, setstate] = useState({
        labels: [],
        datasets: [{
            label: "Max Temp",
            data: [],
        },
        {
            label: "Min Temp",
            data: [],
        }],
    })
    const [currtemp, setcurrtemp] = useState({    
        'location': null,
        'country': null,
        'localtime' : null,
        'condition' : null,
        'icon': null,
        'temp' : null,
        'humidity': null,
        'preci': null,
        'forecast':[]
    })
    
    const myStyle ={
        marginLeft : "20px",
        marginTop : "45px",
        fontFamily : "Arial",
    }

    const changerval=(event)=>{
        setval(event.target.value)
    }
    const getdata=async()=>{
        let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=b6c0a22a716b40718e973559233005&q=${val}&days=5`  )
        response = await response.json()
        console.log(response)
        setcurrtemp({
            'location': response.location.name,
            'country' : response.location.country,
            'localtime' : response.location.localtime,
            'condition' : response.current.condition.text,
            'icon': response.current.condition.icon,
            'temp' : response.current.temp_c,
            'humidity': response.current.humidity,
            'preci': response.current.precip_in,
            'forecast': [
                {'forecast_condi':response.forecast.forecastday[0].day.condition.text, 'day_max': response.forecast.forecastday[0].day.maxtemp_c, 'day_min':response.forecast.forecastday[0].day.mintemp_c, 'day_lt': new Date(response.forecast.forecastday[0].date).getDay()}, 
                {'forecast_condi':response.forecast.forecastday[1].day.condition.text, 'day_max': response.forecast.forecastday[1].day.maxtemp_c, 'day_min':response.forecast.forecastday[1].day.mintemp_c, 'day_lt': new Date(response.forecast.forecastday[1].date).getDay()},
                {'forecast_condi':response.forecast.forecastday[2].day.condition.text, 'day_max': response.forecast.forecastday[2].day.maxtemp_c, 'day_min':response.forecast.forecastday[2].day.mintemp_c, 'day_lt': new Date(response.forecast.forecastday[2].date).getDay()}],
        })
        setval("")
    }
    

    useEffect(()=>{
        setstate({
            labels: currtemp.forecast.map((el)=>{return day[el.day_lt]}),
            datasets: [{
                label: "Max Temp",
                data: currtemp.forecast.map((el)=>{return el.day_max})
            },
            {
                label: "Min Temp",
                data: currtemp.forecast.map((el)=>{return el.day_min})
            }],  
        })
        // eslint-disable-next-line
    }, [currtemp])

    return (
        <>
            <Navbar title="Welcome back User!"/>
            <div className="container"> 
                <div className="row">
                    <div className="col-sm-8" style={myStyle}>
                        <h2 style={{color:'white', fontVariant: 'small-caps'}}><strong>{currtemp.location!==null?`${currtemp.location} , ${currtemp.country}`:''}</strong></h2>
                        <h5 className='my-3' style={{color:'white'}}><strong>{currtemp.location!==null?`${currtemp.temp} °C, ${currtemp.localtime.slice(11,16)} , ${currtemp.condition}`:''}</strong></h5> 
                        <h6 style={{color: 'white',fontVariant: 'small-caps'}}><strong>{currtemp.location!==null?`Precipitation : ${currtemp.preci}`:''}</strong></h6>
                        <h6 style={{color: 'white',fontVariant: 'small-caps'}}><strong>{currtemp.location!==null?`Humidity : ${currtemp.humidity}`:''}</strong></h6>
                        <div style={{width: '70%', height: '70%'}} className='my-5'>
                            {currtemp.location!==null?<Line data={state}/>:<></>}
                        </div>
                    </div>
                    <div className="col">
                        <h4 style={{color:'white'}}>Search for other places</h4>
                        <div className="input-group my-4" style={{width:'75%'}}>
                            <input type="search" className='form-control' placeholder="Search here" value={val} onChange={changerval}/>
                            <button type="button" className="btn btn-info" onClick={getdata}>Search</button>
                        </div>
                        <br/>
                        <br/>
                        <h5 style={{color:'white',textShadow: '2px 2px 2px black'}}>3-day forecast</h5>
                        <hr style={{width:'27%', height:'2px', color:'white'}}/>
                        {currtemp.forecast.map((element,index)=>{
                            return <h5 style={{fontVariant: 'small-caps',textShadow: '2px 2px 2px black'}} className='my-3 text-white' key={index}>{day[element.day_lt]} ({element.forecast_condi}) - {element.day_max}°C/{element.day_min}°C</h5>
                        })}
                    </div>
                </div>  
            </div>       
        </>
    )
}
