import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

const statusOptions = [
  'Pending',
  'In Transit',
  'Out for Delivery',
  'Delivered',
]

const UpdateShipment = () => {
  const [shipmentDetails, setShipmentDetails] = useState({})

  const [status, setStatus] = useState('')

  const {id} = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    getShipmentDetails()
  }, [])

  const getShipmentDetails = async () => {
    try {
      const url = `http://localhost:5000/api/shipment/${id}`
      const response = await fetch(url)
      const data = await response.json()

      setShipmentDetails(data[0])

      setStatus(data[0].shipment_status)
    } catch (error) {
      console.log(error)
    }
  }

  const updateShipmentStatus = async event => {
    event.preventDefault()

    try {
      const url = `http://localhost:5000/api/shipment/${id}`

      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shipment_status: status,
        }),
      }

      const response = await fetch(url, options)

      if (response.ok) {
        navigate('/shipments')
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (shipmentDetails === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-semibold">
          Loading...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Shipment Details
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-gray-500 text-sm">
              Tracking Number
            </p>

            <p className="font-semibold text-lg">
              {shipmentDetails.tracking_number}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Shipment ID
            </p>

            <p className="font-semibold text-lg">
              {shipmentDetails.shipment_id}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Receiver Name
            </p>

            <p className="font-semibold text-lg">
              {shipmentDetails.receiver_name}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Receiver Phone
            </p>

            <p className="font-semibold text-lg">
              {shipmentDetails.receiver_phone}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Parcel Type
            </p>

            <p className="font-semibold text-lg">
              {shipmentDetails.parcel_type}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Estimated Delivery
            </p>

            <p className="font-semibold text-lg">
              {
                shipmentDetails.estimated_delivery_date
              }
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Current Status
            </p>

            <p className="font-semibold text-lg text-blue-600">
              {shipmentDetails.shipment_status}
            </p>
          </div>
        </div>

        <form onSubmit={updateShipmentStatus}>
          <div className="mb-6">
            <label className="block mb-2 font-semibold">
              Update Shipment Status
            </label>

            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            >
              {statusOptions.map(each => (
                <option key={each} value={each}>
                  {each}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-medium"
          >
            Update Status
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateShipment