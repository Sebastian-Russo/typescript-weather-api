import React from 'react';
import { useHistory } from 'react-router-dom'; 
import '../styling/day.css';
import { imageForecast } from '../helper/imageForcast'

type DayProps = {
  day: Array<string>;
  items: Array<string>;
}

export const Day: React.FC<DayProps> = ({day, items}) => {
  const history = useHistory();

  if (!day) return (<div></div>)

  // find date of selected day, match to list of 40 dates, use that index for the start of hourly forecast 
  const date = day[0].dt;
  const listOfDates = items.list.map((x,i) => x.dt);
  let indexStart = listOfDates.findIndex(d => d === date);

  // indexStart begins index, add 5 consecutive numbers to it
  let hourlyArray = [];
  let length = indexStart + 5;
  for (let i=indexStart; i< length; i++) { 
    hourlyArray.push(indexStart)
    indexStart++
  }

  let hourly = hourlyArray.map(item => items.list[item]);

  const hourlyDay = hourly.map((item,i) => {
    let date = new Date(item.dt * 1000);
    let day = date.toString().slice(0,3);
    let time = date.toString().slice(15, 21)
    let forecast1 = item.weather[0].main; // Clouds/Snow/Rain/Clear/Thunderstorm
    let pictureForecast = imageForecast(forecast1)
    let tempHigh = `High: ${Math.round(((item.main.temp_max - 273.15) * 9/5 + 32)*10)/10}`;
    let tempLow = `Low: ${Math.round(((item.main.temp_min - 273.15) * 9/5 + 32)*10)/10}`;
    return (
      <div  key={i} >
        <div className="wrapper-hourly">
              <div className="box-1">{day} {time}</div>
              <div className="box-3">{tempHigh}</div>
              <div className="box-4">{tempLow}</div>
              <img src={pictureForecast} alt="weather" width="100%"/>
        </div>
      </div>
    )
  })

  return (
    <div className="container-hourly">
      <div>You searched for the hourly forecast in {items.city.name}</div>
      <div className="row">
        {hourlyDay}
      </div>
        <button 
          className="btn"
          onClick={() => history.goBack()}
        >Back to 5 day forecast</button>
    </div>
  )

}
