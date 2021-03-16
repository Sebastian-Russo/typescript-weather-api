import { Link } from 'react-router-dom';
import '../styling/week.css';
import { imageForecast } from '../helper/imageForcast'

type WeekProps = {
  handleSingleDay: (arg0:any, arg1:any) => void;
  items: any;
}

export const Week: React.FC<WeekProps> = ({handleSingleDay, items}) => {

  if (!items) return ( <div></div> );
  
  // let sunrise = new Date(items.city.sunrise * 1000);
  // let sunset = new Date(items.city.sunset * 1000);
  // console.log('sunrise:', sunrise, 'sunset;', sunset)
  
  let week = [0,7,15,23,31].map(item => items.list[item]);

  const weekDays = week.map((item,i) => {
    let date = new Date(item.dt * 1000);
    let day = date.toString().slice(0,3);
    let forecast1 = item.weather[0].main; // Clouds/Snow/Rain/Clear/Thunderstorm
    let pictureForecast = imageForecast(forecast1)
    let tempHigh = `High: ${Math.round(((item.main.temp_max - 273.15) * 9/5 + 32)*10)/10}`;
    let tempLow = `Low: ${Math.round(((item.main.temp_min - 273.15) * 9/5 + 32)*10)/10}`;
    return (
      <div className="mobile" key={i} >
        <Link to={`/forecast/${day}`}>        
        <div className="wrapper-week-day" 
          onClick={(e) => handleSingleDay(e,item)}>
              <div className="box-1">{day}</div>
              <div className="box-3">{tempHigh}</div>
              <div className="box-4">{tempLow}</div>
              <img src={pictureForecast} alt="weather" width="100%"/>
        </div>
        </Link>
      </div>
    )
  })

  return (
    <div className="container-week-day">
      <div>You searched for the 5 day forecast in {items.city.name}</div>
      <div className="row">
        {weekDays}
      </div>
    </div>
  )
}