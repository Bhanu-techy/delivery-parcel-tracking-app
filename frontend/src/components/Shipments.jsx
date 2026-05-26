import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from './Header'
import Cookies from 'js-cookie'

const Shipments = () => {
  const [shipments, setShipments] = useState([])
  const [staffId, setStaffId] = useState(0)

  const navigate = useNavigate()

  const userId = Cookies.get('userId')
  console.log(staffId)

  useEffect(() => {
    getShipments()
    getStaffId()
  }, [staffId])

  const getStaffId = async () => {
    const response = await fetch(`https://delivery-parcel-tracking-app.onrender.com/api/staff/${userId}`)
    const data = await response.json()
    setStaffId(data.staff_id)
  }

  const getShipments = async () => {
    const url = `https://delivery-parcel-tracking-app.onrender.com/api/delivery-staff/${staffId}/shipments`

    const response = await fetch(url)
    const data = await response.json()
    setShipments(data)
  }

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Shipments List
      </h1>

      <div className="grid gap-5">
        {shipments.map(each => (
          <div
            key={each.shipment_id}
            className="bg-white rounded-xl shadow-md p-5"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold text-blue-600">
                  {each.tracking_number}
                </h2>

                <p className="text-gray-500 text-sm">
                  {each.shipment_status}
                </p>
              </div>

              {each.shipment_status !== "Delivered" ? <button
                type="button"
                onClick={() =>
                  navigate(
                    `/update-shipment/${each.shipment_id}`,
                  )
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Update Status
              </button> : <p className='bg-yellow-300 w-[130px] text-center px-4 py-2 rounded-lg'>{each.shipment_status}</p>}

            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">
                  Receiver Name
                </p>

                <p>{each.receiver_name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Receiver Phone
                </p>

                <p>{each.receiver_phone}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Parcel Type
                </p>

                <p>{each.parcel_type}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Delivery Date
                </p>

                <p>{each.estimated_delivery_date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Shipments