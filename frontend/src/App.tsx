import React from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    ;(async function fetchData() {
      const { data } = await axios.get('http://localhost:5000/items')

      setItems(data)
    })()
  }, [])

  return (
    <div>
      {items.map(({ _id, title, description }) => (
        <div key={_id}>
          <span>{title}</span> <span>{description}</span>
        </div>
      ))}
    </div>
  )
}

export default App
