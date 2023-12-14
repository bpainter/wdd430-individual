import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../lib/mongodb';
import { Speaking } from '../../../src/models/speaking';

export default async function speakingHandler(req: NextApiRequest, res: NextApiResponse) {
  const db = await connectToDatabase();
  const collection = db.collection('speakings');

  switch (req.method) {
    case 'GET':
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const speaking = await collection.find({}).skip(skip).limit(limit).toArray();
      console.log('Speaking data:', speaking); // Log speaking data
      res.status(200).json(speaking);
      break;
    case 'POST':
      const newSpeaking = req.body;
      const result = await collection.insertOne(newSpeaking);
      const insertedSpeaking = await collection.findOne({ _id: result.insertedId });
      res.status(201).json(insertedSpeaking);
      break;
    case 'PUT':
      const { _id, ...updatedSpeaking } = req.body;
      const updateResult = await collection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { ...updatedSpeaking } }
      );

      if (updateResult.matchedCount === 0) {
        return res.status(404).json({ error: 'Speaking not found' });
      }

      const updatedItem = await collection.findOne({ _id: new ObjectId(_id) });
      res.status(200).json(updatedItem);
      break;
    case 'DELETE':
      const { _id: _idToDelete } = req.body;
      const deleteResult = await collection.deleteOne({ _id: new ObjectId(_idToDelete) });

      if (deleteResult.deletedCount === 0) {
        return res.status(404).json({ error: 'Speaking not found' });
      }

      res.status(200).json({ message: 'Deleted successfully' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}