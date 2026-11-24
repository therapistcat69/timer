import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
const cookieName='focus_auth';
function sign(value:string) { return createHmac('sha256',process.env.AUTH_SECRET || '').update(value).digest('hex'); }
export function validPasscode(input:string) { const a=Buffer.from(input), b=Buffer.from(process.env.APP_PASSCODE || ''); return !!process.env.AUTH_SECRET && !!process.env.APP_PASSCODE && a.length===b.length && timingSafeEqual(a,b); }
export async function authorized() { const c=(await cookies()).get(cookieName)?.value; if(!c)return false; const [value,sig]=c.split('.'); if(value!=='ok'||!sig)return false; const got=Buffer.from(sig),expected=Buffer.from(sign(value)); return got.length===expected.length&&timingSafeEqual(got,expected); }
export const authCookie = { name:cookieName, value:`ok.${sign('ok')}` };
