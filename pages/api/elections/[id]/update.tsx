import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Requesting update');
  if (req.method == 'POST') {
    const electionId = parseInt(req.query.id as string) ?? -1;

    if (electionId == 9) {
      axios.get('https://resultados.gob.ar/backend-difu/scope/data/getScopeData/00000000000000000000000b/1/1')
        .then(async function(response) {

          const electionData = response.data;

          const argentinaPopulation = electionData.census;

          const regionsIds = {
            'Buenos Aires': 53,
            'Catamarca': 54,
            'Chaco': 55,
            'Chubut': 56,
            'Ciudad Autónoma de Buenos Aires': 57,
            'Corrientes': 58,
            'Córdoba': 59,
            'Entre Ríos': 60,
            'Formosa': 61,
            'Jujuy': 62,
            'La Pampa': 63,
            'La Rioja': 64,
            'Mendoza': 65,
            'Misiones': 66,
            'Neuquén': 67,
            'Río Negro': 68,
            'Salta': 69,
            'San Juan': 70,
            'San Luis': 71,
            'Santa Cruz': 72,
            'Santa Fe': 73,
            'Santiago del Estero': 74,
            'Tierra del Fuego, Antártida e Islas del Atlántico Sur': 75,
            'Tucumán': 76
          };

          const partiesIds = {
            'FRENTE DE IZQUIERDA Y DE TRABAJADORES - UNIDAD': 8,
            'HACEMOS POR NUESTRO PAIS': 9,
            'JUNTOS POR EL CAMBIO': 10,
            'LA LIBERTAD AVANZA': 11,
            'UNION POR LA PATRIA': 12
          };

          try {
            const updateResponse = await prisma.$queryRaw`UPDATE elections
                                                          SET turnout     = ${electionData.totalVotos * 100 / argentinaPopulation},
                                                              bare        = ${electionData.pollingCensus * 100 / argentinaPopulation},
                                                              total_votes = ${electionData.totalVotos},
                                                              last_update = ${new Date()}
                                                          WHERE id = ${electionId};`;

            await Promise.all(electionData.mapa[0].scopes.map(async (scope: { partidos: any[]; name: string | number; }) => {
              await Promise.all(scope.partidos.map(async (party) => {
                console.log(party.name + ' ' + party.votos);
                const res = await prisma.$queryRaw`UPDATE votes
                                                   SET total_votes = ${party.votos}
                                                   WHERE election_id = ${electionId}
                                                     AND region_id = ${regionsIds[scope.name]}
                                                     AND party_id = ${partiesIds[party.name]};`;
              }));
            }));

            res.status(200).json({ message: 'Election updated', updateResponse: updateResponse });
          } catch (e) {
            res.status(500).json({ error: 'Internal server error', e: e.message, var: electionData });
          }
        });
    } else if (electionId == 10) {
      const electionData = req.body.data;

      const argentinaPopulation = electionData.census;

      const regionsIds = {
        'Buenos Aires': 53,
        'Catamarca': 54,
        'Chaco': 55,
        'Chubut': 56,
        'Ciudad Autónoma de Buenos Aires': 57,
        'Corrientes': 58,
        'Córdoba': 59,
        'Entre Ríos': 60,
        'Formosa': 61,
        'Jujuy': 62,
        'La Pampa': 63,
        'La Rioja': 64,
        'Mendoza': 65,
        'Misiones': 66,
        'Neuquén': 67,
        'Río Negro': 68,
        'Salta': 69,
        'San Juan': 70,
        'San Luis': 71,
        'Santa Cruz': 72,
        'Santa Fe': 73,
        'Santiago del Estero': 74,
        'Tierra del Fuego, Antártida e Islas del Atlántico Sur': 75,
        'Tucumán': 76
      };

      const partiesIds = {
        'FRENTE DE IZQUIERDA Y DE TRABAJADORES - UNIDAD': 8,
        'HACEMOS POR NUESTRO PAIS': 9,
        'JUNTOS POR EL CAMBIO': 10,
        'LA LIBERTAD AVANZA': 11,
        'UNION POR LA PATRIA': 12
      };

      try {
        const updateResponse = await prisma.$queryRaw`UPDATE elections
                                                      SET turnout     = ${electionData.totalVotos * 100 / argentinaPopulation},
                                                          bare        = ${electionData.pollingCensus * 100 / argentinaPopulation},
                                                          total_votes = ${electionData.totalVotos},
                                                          last_update = ${new Date()}
                                                      WHERE id = ${electionId};`;

        await Promise.all(electionData.mapa[0].scopes.map(async (scope: { partidos: any[]; name: string | number; }) => {
          await Promise.all(scope.partidos.map(async (party) => {
            console.log(party.name + ' ' + party.votos);
            const res = await prisma.$queryRaw`UPDATE votes
                                               SET total_votes = ${party.votos}
                                               WHERE election_id = ${electionId}
                                                 AND region_id = ${regionsIds[scope.name]}
                                                 AND party_id = ${partiesIds[party.name]};`;
          }));
        }));

        res.status(200).json({ message: 'Election updated', updateResponse: updateResponse });
      } catch (e) {
        res.status(500).json({ error: 'Internal server error', e: e.message, var: electionData });
      }
    } else {
      res.status(400).json('GEM is not prepared to handle this election yet.');
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
}