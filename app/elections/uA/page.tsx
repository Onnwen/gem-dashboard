'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function UpdateArgentina() {

    let [lastUpdate, setLastUpdate] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
        fetch(`https://resultados.gob.ar/backend-difu/scope/data/getScopeData/00000000000000000000000b/1/1`)
            .then((res) => res.json())
            .then((data) => {
              setLastUpdate(new Date().toLocaleString());
              axios.post('/api/elections/10/update', {
                data: data
              });
            });
        }, 10000);

        return () => clearInterval(interval);
    }, []);

  return (
    <main className='p-4 md:p-10 mx-auto max-w-7xl'>
      <p className={"text-2xl font-bold"}>Aggiornamento dati Argentina</p>
      <p className={"text-lg font-medium"}>Ultimo aggiornamento: {lastUpdate}</p>
    </main>
  );
}
