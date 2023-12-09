import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../lib/mongodb';
import { Presentation } from '../../models/presentation';

export default async function presentationsHandler(req: NextApiRequest, res: NextApiResponse) {
  const db = await connectToDatabase();
  const collection = db.collection('presentations');

  switch (req.method) {
    case 'GET':
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const presentations = await collection.find({}).skip(skip).limit(limit).toArray();
      res.status(200).json(presentations);
      break;
    case 'POST':
      const newPresentation = req.body;
      const result = await collection.insertOne(newPresentation);
      const insertedPresentation = await collection.findOne({ _id: result.insertedId });
      res.status(201).json(insertedPresentation);
      break;
    case 'PUT':
      const { _id, ...updatedPresentation } = req.body;
      const updateResult = await collection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: { ...updatedPresentation } }
      );

      if (updateResult.matchedCount === 0) {
        return res.status(404).json({ error: 'Presentation not found' });
      }

      const updatedItem = await collection.findOne({ _id: new ObjectId(_id) });
      res.status(200).json(updatedItem);
      break;
    case 'DELETE':
      const { _id: _idToDelete } = req.body;
      const deleteResult = await collection.deleteOne({ _id: new ObjectId(_idToDelete) });

      if (deleteResult.deletedCount === 0) {
        return res.status(404).json({ error: 'Presentation not found' });
      }

      res.status(200).json({ message: 'Deleted successfully' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
