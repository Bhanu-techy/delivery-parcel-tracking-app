const express = require('express')
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(cors());
app.use(express.json())

const dbPath = path.join(__dirname, 'database.db')

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    db.run('delete from users where user_id =1')

    app.listen(5000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
    
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

initializeDBAndServer()


app.post('/login', async (request, response) => {
  const {email, password, role} = request.body
  const getQuery = `select * from users where email = '${email}'`
  const dbUser = await db.get(getQuery)

  if (dbUser === undefined) {
    response.status(400)
    response.send('Invalid User')
  } else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password)

    if (isPasswordMatched === true) {
      const payload = {id: dbUser.user_id, email: dbUser.email}
      const jwtToken = jwt.sign(payload, 'MY_SECRET_TOKEN')

      if (dbUser.role === role){
        response.status(200)
         response.send({jwt_token: jwtToken, id : dbUser.user_id})
      }else{
         response.status(400)
         response.send({error_msg: 'Invalid Role selection'})
      }

    } else {
      response.status(400)
      response.send({error_msg: 'Invalid Password'})
    }
  }
})


app.get('/users', async (req,res)=>{
  const users = await db.all(`
    SELECT * FROM users;
  `)
  res.send(users)
})

app.get('/api/shipments', async (req,res)=>{
  const users = await db.all(`
    SELECT * FROM shipments;
  `)
  res.send(users)
})

app.put('/api/shipments/:id/status', async (request, response) => {

  const {id} = request.params

  const {
    shipment_status,
  } = request.body

  const updateQuery = `
    UPDATE shipments
    SET shipment_status = ?
    WHERE shipment_id = ?;
  `
  await db.run(updateQuery, [shipment_status, id,])

  response.send({
    message: 'Shipment Status Updated',
  })
})

app.get('/api/track/:trackingId', async (request, response) => {

  const {trackingId} = request.params

  const trackQuery = `
    SELECT
      s.shipment_id,
      s.tracking_number,
      s.shipment_status,
      s.estimated_delivery_date,
      t.current_location,
      t.remarks,
      t.updated_at
    FROM shipments s
    LEFT JOIN tracking_updates t
    ON s.shipment_id = t.shipment_id
    WHERE s.tracking_number = ?;`

  const trackingDetails = await db.all(trackQuery, [trackingId])

  response.send(trackingDetails)
})

app.get('/api/staff/:userId', async (request, response) => {
  const {userId} = request.params
  const query = `
    SELECT
      staff_id,
      user_id
    FROM delivery_staff
    WHERE user_id = ?;`
  const staff = await db.get(query, [userId])

  response.send(staff)
})


app.get('/api/delivery-staff/:id/shipments', async (request, response) => {
  const {id} = request.params
  const query = `
    SELECT
      s.shipment_id,
      s.tracking_number,
      s.shipment_status,
      s.estimated_delivery_date,

      p.receiver_name,
      p.receiver_phone,
      p.parcel_type

    FROM shipments s

    JOIN parcels p
    ON s.parcel_id = p.parcel_id

    WHERE s.assigned_staff_id = ?;`
  const shipments = await db.all(query, [id])

  response.send(shipments)
})

app.post('/api/delivery-proof', async (request, response) => {
  const {
    shipment_id,
    delivered_to,
    proof_image
  } = request.body

  const insertQuery = `
    INSERT INTO delivery_proofs (
      shipment_id,
      delivered_to,
      proof_image
    )
    VALUES (?, ?, ?);`

  await db.run(insertQuery, [
    shipment_id,
    delivered_to,
    proof_image,
  ])

  response.send({
    message: 'Delivery Proof Uploaded',
  })
})

app.get('/api/shipment/:id', async (request, response) => {
  const {id}=request.params
  const getShipmentsQuery = `
    SELECT
      s.shipment_id,
      s.tracking_number,
      s.shipment_status,
      s.estimated_delivery_date,
      p.receiver_name,
      p.receiver_phone
    FROM shipments s
    JOIN parcels p
    ON s.parcel_id = p.parcel_id
    where shipment_id = ${id}
    ;
  `
  const shipments = await db.all(getShipmentsQuery)

  response.send(shipments)
})

app.get('/api/dashboard/admin', async (request, response) => {

  const totalShipments = await db.get(`
    SELECT COUNT(*) AS total_shipments
    FROM shipments;
  `)

  const deliveredShipments = await db.get(`
    SELECT COUNT(*) AS delivered_shipments
    FROM shipments
    WHERE shipment_status = 'Delivered';
  `)

  const delayedShipments = await db.get(`
    SELECT COUNT(*) AS delayed_shipments
    FROM shipments
    WHERE shipment_status = 'Delayed';
  `)

  const activeDeliveries = await db.get(`
    SELECT COUNT(*) AS active_deliveries
    FROM shipments
    WHERE shipment_status IN (
      'Packed',
      'In Transit',
      'Out for Delivery'
    );
  `)

  response.send({
    totalShipments,
    deliveredShipments,
    delayedShipments,
    activeDeliveries,
  })
})