import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../lib/mongodb';
import Boss from '../../models/boss';

export default async function bossHandler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  switch (req.method) {
    case 'GET':
      if (req.query._id) {
        const boss = await Boss.findById(new ObjectId(req.query._id as string));
        if (!boss) {
          return res.status(404).json({ error: 'Boss not found' });
        }
        res.status(200).json(boss);
      } else {
        const bosses = await Boss.find({});
        res.status(200).json(bosses);
      }
      break;
    case 'POST':
      const newBoss = new Boss(req.body);
      const result = await newBoss.save();
      res.status(201).json(result);
      break;
    case 'PUT':
      const { _id, ...updatedBoss } = req.body;
      const updateResult = await Boss.findByIdAndUpdate(new ObjectId(_id as string), updatedBoss, { new: true });
      if (!updateResult) {
        return res.status(404).json({ error: 'Boss not found' });
      }
      res.status(200).json(updateResult);
      break;
    case 'DELETE':
      const deleteResult = await Boss.findByIdAndDelete(new ObjectId(req.query._id as string));
      if (!deleteResult) {
        return res.status(404).json({ error: 'Boss not found' });
      }
      res.status(200).json({ message: 'Boss deleted successfully' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}