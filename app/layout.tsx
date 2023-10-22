import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import Toast from './toast';
import { Suspense } from 'react';

export const metadata = {
  title: 'GEM',
  description:
    'A new way to stay connected with elections.'
};

export default async function RootLayout({
                                           children
                                         }: {
  children: React.ReactNode;
}) {
  return (
    // <html lang='it' className='h-full bg-gray-50'>
    <html lang='it'>
    <body>
    {/*<Suspense>*/}
    {/*  <Nav />*/}
    {/*</Suspense>*/}
    {children}
    {/*<Analytics />*/}
    {/*<Toast />*/}
    </body>
    </html>
  );
}
