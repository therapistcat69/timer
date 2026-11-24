import mongoose from 'mongoose';
declare global { var mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined; }
const cache = global.mongooseCache ?? (global.mongooseCache = { conn: null, promise: null });
export default async function db() { if (cache.conn) return cache.conn; const uri=process.env.MONGODB_URI; if(!uri)throw new Error('Please define MONGODB_URI in your environment'); if (!cache.promise) cache.promise = mongoose.connect(uri, { bufferCommands: false }); cache.conn = await cache.promise; return cache.conn; }
