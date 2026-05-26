import {useEffect, useState} from 'react'
import Header from './Header'

function Home() {

  const [data, setData] = useState([])

  useEffect(()=>{
    const getShipments  = async () => {
      const response = await fetch('https://delivery-parcel-tracking-app.onrender.com/api/shipments')
      const data = await response.json();
      if(response.ok){
        setData(data)
      }
    }
    getShipments()
  })

  return (
    <>
    <Header/>
    <div>Home</div>
    </>
  )
}

export default Home