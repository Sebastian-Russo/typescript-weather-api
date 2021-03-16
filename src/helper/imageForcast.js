import cloudy from '../images/cloudy.png';
import rainy from '../images/rainy.png';
import snowy from '../images/snowy.png';
import stormy from '../images/stormy.png';
import sunny from '../images/sunny.png';

  // sunny/rainy/cloudy/snowy
  export const imageForecast = type => {
    const obj = {
      "Clouds": cloudy,
      "Drizzle": rainy,
      "Rain": rainy,
      "Snow": snowy,
      "Thunderstorm": stormy,
      "Clear": sunny
    }
    return obj[type] 
  }