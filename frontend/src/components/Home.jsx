import {useEffect, useState} from 'react'
import Header from './Header'

function Home() {

  const [shipments, setShipments] = useState([])

  useEffect(()=>{
    const getShipments  = async () => {
      const response = await fetch('http://localhost:5000/api/shipments')
      const data = await response.json();
      if(response.ok){
        setShipments(data)

      }
    }
    getShipments()
  },[])

  return (
    <>
    <Header/>
    <div>
      <h1 className='m-3 text-xl font-bold'>Shipments</h1>
        <ul className='flex flex-wrap'>
         {shipments.map((each) => (
            <li
              key={each.shipment_id}
              className="border p-4 mb-3 rounded-lg shadow w-[200px] m-2">
              <p>{each.parcel_type}</p>
              <p>{each.estimated_delivery_date}</p>
              <p>{each.tracking_number}</p>
              <p>{each.weight}</p>
            </li>
          ))}
        </ul>
    </div>
    </>
  )
}


export default Home