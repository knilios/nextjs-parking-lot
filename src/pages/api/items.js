// pages/api/items.js
import DBConnector from '../../lib/mongodb';
import Item from '../../models/item';

export default async function handler(req, res) {
  await DBConnector.createInstance().connect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const items = await Item.find({});
        res.status(200).json({ success: true, data: items });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const item = await Item.create(req.body);
        res.status(201).json({ success: true, data: item });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
