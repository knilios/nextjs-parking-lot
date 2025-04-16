import DBConnector from '@/lib/mongodb';
import vehicle from '@/models/vehicles/vehicle'
import motorcycle from '@/models/vehicles/motorcycle';
import car from '@/models/vehicles/car';
import bus from '@/models/vehicles/bus';

export default async function handler(req, res) {
  await DBConnector.createInstance().connect();


  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const items = await vehicle.find({parkingLocation: null}).exec();
        res.status(200).json({ success: true, data: items });
      } catch (error) {
        console.log("The error: ", error)
        res.status(400).json({ success: false, error:error});
      }
      break;
    case 'POST':
      try {
        let data;
        console.log(req.body)
        switch(req.body.type){
          case '0':
            data = await motorcycle.create({name: req.body.name})
            break;
          case '1':
            data = await car.create({name: req.body.name})
            break;
          case '2':
            data = await bus.create({name: req.body.name})
            break;
        }
        data.save()
        res.status(201).json({ success: true, data: data });
      } catch (error) {
        console.log("The error: ", error)
        res.status(500).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
