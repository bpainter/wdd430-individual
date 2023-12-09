import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import connectToDatabase from '../../lib/mongodb';
import { CommunityEvent } from '../../models/community';

export default async function communityHandler(req: NextApiRequest, res: NextApiResponse) {
  const db = await connectToDatabase();
  const collection = db.collection('communityEvents');

  switch (req.method) {
    case 'GET':
      if (req.query._id) {
        // Fetch a single item by its OID
        const communityEvent = await collection.findOne({ _id: new ObjectId(req.query._id as string) });
        if (!communityEvent) {
          return res.status(404).json({ error: 'Community event not found' });
        }
        res.status(200).json(communityEvent);
      } else {
        // Fetch the entire collection with pagination
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const communityEvents = await collection.find({}).skip(skip).limit(limit).toArray();
        res.status(200).json(communityEvents);
      }
      break;
    case 'POST':
      const newCommunityEvent = req.body;
      const result = await collection.insertOne(newCommunityEvent);
      const insertedCommunityEvent = await collection.findOne({ _id: result.insertedId });
      res.status(201).json(insertedCommunityEvent);
      break;
    case 'PUT':
      const { _id, ...updatedCommunityEvent } = req.body;
      const updateResult = await collection.updateOne(
        { _id: new ObjectId(_id) },
        { $set: updatedCommunityEvent }
      );
      if (updateResult.matchedCount === 0) {
        return res.status(404).json({ error: 'Community event not found' });
      }
      res.status(200).json({ message: 'Community event updated successfully' });
      break;
    case 'DELETE':
      const deleteResult = await collection.deleteOne({ _id: new ObjectId(req.query._id as string) });
      if (deleteResult.deletedCount === 0) {
        return res.status(404).json({ error: 'Community event not found' });
      }
      res.status(200).json({ message: 'Community event deleted successfully' });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}