import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styling/weather-input.css';

type WeatherInputProps = {
  fetchData: (obj: Location) => void;
}

export const WeatherInput: React.FC<WeatherInputProps> = ({fetchData}) => {
  const [input, setInput] = useState('');
  const history = useHistory();
  
  // FormEvent (event handle type), <HTMLButtonElement> restrict to specific element (generic)
  const handleSubmit = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    console.log(input)
    let words: string | string[] = input.replace(',', '')
    words = words.split(' ').reverse();
    let obj = {
      state: words[0],
      city: words.slice(1).reverse().join(' ')
    }

    if (obj.state.length > 2 || obj.state.length < 2) {
      alert('use to letters for state')
    } else {
      fetchData(obj)
    }
    history.push('/forecast');
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label>Enter City and State (two letters for state)</label>
      <input 
        type="text"
        value={input}
        placeholder="city, state"
        onChange={e => setInput(e.target.value)}
      />
      <input 
        type="submit" 
        value="Submit" 
        disabled={input === ""}
        className="btn"
      />
    </form>
  );
}
