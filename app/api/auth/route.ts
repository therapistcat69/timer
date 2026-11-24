import { NextResponse } from 'next/server';
import { authCookie,validPasscode } from '@/lib/auth';
export async function POST(req:Request) { const {passcode}=await req.json(); if(!validPasscode(String(passcode||''))) return NextResponse.json({error:'Incorrect passcode'},{status:401}); const res=NextResponse.json({ok:true}); res.cookies.set(authCookie.name,authCookie.value,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:60*60*24*30}); return res; }
export async function DELETE() { const res=NextResponse.json({ok:true});res.cookies.delete(authCookie.name);return res; }
