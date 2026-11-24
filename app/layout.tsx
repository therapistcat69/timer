import type {Metadata} from 'next';import './globals.css';
export const metadata:Metadata={title:'Still — Focus timer',description:'A calm place for deep work.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
