import { useState, useEffect } from 'react';
import { NewDiaryEntry, NonSensitiveDiaryEntry, Visibility, Weather } from './interfaces';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Diary from './components/Diary';


function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)
  useEffect(() => {
    axios.get('http://localhost:3000/api/diaries').then(response => {
      setDiaries(response.data as NonSensitiveDiaryEntry[]);
    })
  }, [])

  useEffect(() => {
    if (errorMessage !== null) {
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }, [errorMessage])

  const handleAddEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newEntry: NewDiaryEntry = {
      comment: comment,
      date: date,
      weather: (weather as Weather),
      visibility: (visibility as Visibility)
    }
    try {
      await axios.post('http://localhost:3000/api/diaries', { ...newEntry })
        .then(response => {
          setDiaries(diaries.concat(response.data as NonSensitiveDiaryEntry[]))
        })
      setDate("")
      setVisibility("")
      setComment("")
      setWeather("")
    } catch (e) {
      const error = e as AxiosError;
      const response = error.response as AxiosResponse;
      console.log('errorMessage2', response)
      // const errorText = error?.response?.data
      setErrorMessage(response.data)
    }
  }

  return (
    <div>
      <div>
        <h3>Add new entry</h3>
        <h4 style={{color:"red"}}>{errorMessage}</h4>
        <form onSubmit={(e) => handleAddEntry(e)}>
          <div>
            <label>
              date:
              <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              visibility:
              great<input type="radio" name="visibility" value={visibility} onChange={() => setVisibility("great")} />
              good<input type="radio" name="visibility" value={visibility} onChange={() => setVisibility("good")} />
              ok<input type="radio" name="visibility" value={visibility} onChange={() => setVisibility("ok")} />
              poor<input type="radio" name="visibility" value={visibility} onChange={() => setVisibility("poor")} />
            </label>
          </div>
          <div>
            <label>
              weather:
              sunny<input type="radio" name="weather" value={visibility} onChange={() => setWeather("sunny")} />
              rainy<input type="radio" name="weather" value={visibility} onChange={() => setWeather("rainy")} />
              cloudy<input type="radio" name="weather" value={visibility} onChange={() => setWeather("cloudy")} />
              stormy<input type="radio" name="weather" value={visibility} onChange={() => setWeather("stormy")} />
              windy<input type="radio" name="weather" value={visibility} onChange={() => setWeather("windy")} />
            </label>
          </div>
          <div>
            <label>
              comment:
              <input type="text" name="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
            </label>
          </div>
          <input type="submit" value="add" />
        </form>

        <h3>Diary entries</h3>
        {diaries.map((diary: NonSensitiveDiaryEntry) => {
          return <Diary key={diary.id} id={diary.id} date={diary.date} weather={diary.weather} visibility={diary.visibility} />
        })}
      </div>
    </div>
  )
}

export default App
