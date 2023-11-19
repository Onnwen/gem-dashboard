import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import Toast from './toast';
import { Suspense } from 'react';
import Safe from 'react-safe';

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
    <body id={'wrapper'}>
    {/*<Suspense>*/}
    {/*  <Nav />*/}
    {/*</Suspense>*/}
    {children}
    {/*<Analytics />*/}
    {/*<Toast />*/}
    <Safe.script>{
      `
      function sendHeight()
      {
        if(parent.postMessage)
      {
        var height= document.getElementById('wrapper').offsetHeight;
        parent.postMessage(height, '*');
      }
      }

      var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
      var eventer = window[eventMethod];
      var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

      eventer(messageEvent, function(e) {

      if (isNaN(e.data)) return;

      sendHeight();

    },
      false
      )
      ;`
    }
    </Safe.script>
    </body>
    </html>
  );
}
