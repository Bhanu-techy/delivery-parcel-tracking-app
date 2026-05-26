import {useState, useEffect} from 'react'
import Header from './Header';
import {
  Truck,
  Clock3,
  PackageCheck,
  Activity,
} from "lucide-react";

const Dashboard = () => {
    
    const [totalShipments, setTotalShipments] = useState(0)
    const [delayedShipments, setDelayedShipments] = useState(0)
    const [activeShipments, setActiveShipments] = useState(0)
    const [deliveredShipments, setDeliveredShipments] = useState(0)

    useEffect(()=>{
        const getDashboard = async () =>{
            const response = await fetch('https://delivery-parcel-tracking-app.onrender.com/api/dashboard/admin')
            const data = await response.json()
            if (response.ok){
                setDelayedShipments(data.delayedShipments.delayed_shipments)
                setActiveShipments(data.activeDeliveries.active_deliveries)
                setDeliveredShipments(data.deliveredShipments.delivered_shipments)
                setTotalShipments(data.totalShipments.total_shipments)
            }
            
        }
        getDashboard()
    })

  const shipmentData = [
    {
      title: "Total Shipments",
      count: totalShipments,
      icon: <Truck size={30} />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Active Shipments",
      count: activeShipments,
      icon: <Activity size={30} />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Delivered",
      count: deliveredShipments,
      icon: <PackageCheck size={30} />,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    {
      title: "Delayed Shipments",
      count: delayedShipments,
      icon: <Clock3 size={30} />,
      bg: "bg-red-100",
      text: "text-red-600",
    },
  ];

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Shipment Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Monitor shipment activities and delivery status
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {shipmentData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between"
          >
            <div>
              <h2 className="text-gray-500 text-sm">
                {item.title}
              </h2>

              <p className="text-3xl font-bold mt-2">
                {item.count}
              </p>
            </div>

            <div
              className={`${item.bg} ${item.text} p-4 rounded-xl`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Dashboard