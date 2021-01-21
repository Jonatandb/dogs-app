import { useEffect, useState, useCallback } from "react";
import Card from "./components/Card";
import Error from "./components/Error";
import Select from "./components/Select";
import getDog from './helpers/getDog'

const initialDog = {
  image: '',
  breed: {
    id: 0,
    name: ''
  }
}

function App() {
  const [dog, setDog] = useState(initialDog)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const updateDog = useCallback((breedId) => {
    setLoading(true)
    getDog(breedId)
      .then(newDog => {
        setDog(newDog)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setError('Error al cargar un perro')
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    updateDog()
  }, [updateDog])

  return (
    <div className="app">
      <Select updateDog={updateDog} />
      {error && <Error error={error} />}
      <Card dog={dog} updateDog={updateDog} loading={loading} />
    </div>
  );
}

export default App;
