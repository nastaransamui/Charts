
import { getSession } from 'next-auth/client'
import {connectToDatabase } from '../../../lib/mongodb'
export default async (req, res) => {
  const session = await getSession({ req })
  const { db } = await connectToDatabase();
  const users = await db
  .collection("users")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  if (session) {
    res.json(users);
  } else {
    res.json({ error: 'You must be sign in to view the protected content on this page.' })
  }
}