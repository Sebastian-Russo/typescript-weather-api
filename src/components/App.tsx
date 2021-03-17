import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import '../styling/App.css';
import { WeatherInput } from './weather-input';
import { Week } from './week';
import { Day } from './day';

type Location = {
  state: string;
  city: string;
}

const App: React.FC = () => {
  const [day, setDay] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);

  const fetchData = async (location: Location) => {
    const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';
    const API_KEY = process.env.REACT_APP_API_KEY;

    const options = `${API_URL}?q=${location.city},${location.state},US&appid=${API_KEY}`
    try {
      const {data} = await axios.get(options);
      setItems(data)
    } catch (err) {
      console.error(err)
      alert('Please check spelling of city and state.')
    };
  };

  const hanldeSingleDay = (e: any, day: any) => {
    let item: Array<string> = [day]; 
    setDay(item)
  }

  return (
    <Router>
      <div className="App">
        <WeatherInput fetchData={fetchData}/>

        <Switch>
          <Route 
            exact
            path="/forecast" 
            render={props=>
              <Week {...props}
                hanldeSingleDay={hanldeSingleDay} 
                items={items} />
            }
          />
          <Route 
            path="/forecast/:day" 
            render={props =>
              <Day {...props} day={day} items={items}/>
            }  
          />
        </Switch>
      
      </div>
    </Router>
  );
}

export default App;
