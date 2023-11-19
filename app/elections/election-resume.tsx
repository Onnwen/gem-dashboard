'use client';

import React from "react"
import { BarChart, Card, Legend, Metric, Subtitle, Title } from '@tremor/react';
import CandidateResume from './candidate-resume';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

export default function ElectionResume({electionData}) {
  const chartdata = [
    {
      name: "Voti"
    }
  ];

  electionData.votes.forEach((vote) => {
    chartdata[0][vote.candidate_last_name] = vote.total_votes;
  });

  let chartColors = []
  electionData.votes.forEach((vote) => {
    chartColors.push(vote.party_color_name);
  });

  let chartCategories = []
  let totalVotes = 0;
  electionData.votes.forEach((vote) => {
    chartCategories.push(vote.candidate_last_name);
    totalVotes += Number(vote.total_votes);
  });

  electionData.votes.forEach((vote) => {
    vote.total_votes_percentage = vote.total_votes / totalVotes * 100;
  });
  electionData.candidates.forEach((candidate) => {
    candidate.total_votes_percentage = electionData.votes.find((vote) => vote.candidate_last_name == candidate.candidate_last_name).total_votes_percentage;
  });

  const winner = electionData.votes.reduce((a, b) => a.total_votes_percentage > b.total_votes_percentage ? a : b);

  return (
    <div className={"bg-white rounded-md shadow-md"}>
      <Metric className={"mt-5 text-center"}>Ultimi dati</Metric>
      <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-around mt-8 gap-x-4 gap-y-10 mb-10"}>
        <div className={"flex flex-col justify-center items-center"}>
          <p className={"text-7xl font-bold font-semibold"}>{Math.round(electionData.turnout * 10) / 10}%</p>
          <Subtitle className={"mt-2 font-medium tracking-wider"}>AFFLUENZA • {electionData.election_total_votes} VOTI</Subtitle>
        </div>
        <div className={"flex flex-col justify-center items-center"}>
          <p className={"text-7xl font-bold font-semibold"}>{winner.candidate_last_name}</p>
          <Subtitle className={"mt-2 font-medium tracking-wider"}>IN TESTA • {winner.total_votes_percentage}%</Subtitle>
        </div>
        <div className={"flex flex-col justify-center items-center"}>
          <p className={"text-7xl font-bold font-semibold"}>{Math.round(electionData.bare * 10) / 10}%</p>
          <Subtitle className={"mt-2 font-medium tracking-wider"}>SPOGLIO</Subtitle>
        </div>
      </div>

      <Metric className={"mt-20 text-center"}>Candidati in gara</Metric>
      <div className={"grid grid-cols-1 md:grid-cols-2 place-content-around mt-8 gap-x-4 gap-y-10"}>
        {electionData.candidates.map((candidate) => (
          <CandidateResume key={candidate.id} candidateData={candidate}></CandidateResume>
        ))}
      </div>

      <Metric className={"mt-20 text-center"}>Fino all ultimo voto</Metric>
      <BarChart
        className="mt-8"
        data={chartdata}
        index="name"
        categories={chartCategories}
        yAxisWidth={70}
        colors={chartColors}
      />

      <Metric className={"mt-20 text-center"}>La situazione vista dall alto</Metric>
      <ComposableMap projection="geoStereographic"
                     projectionConfig={{
                       rotate: [0, 0, 0],
                       center: [electionData.map.map_translate_x, electionData.map.map_translate_y],
                       scale: electionData.map.map_scale,
                     }}>
        <Geographies geography={electionData.map.map_url}>
          {({ geographies }) =>
            geographies.map((geo) => {
              return (
                <Geography
                  data-tooltip-target={geo.properties.name + 'tooltip'}
                  key={geo.rsmKey}
                  geography={geo}
                  stroke="#FFF"
                  strokeWidth={1}
                  fill={electionData.map.map.find((region) => region.name == geo.properties[electionData.map.map_property_name]) != undefined ? "#" + electionData.map.map.find((region) => region.name == geo.properties[electionData.map.map_property_name]).color : "#DDD"}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <Legend
        className='justify-center'
        categories={electionData.candidates.map(a => a.candidate_last_name)}
        colors={electionData.candidates.map(a => a.party_color_name)}
      />

      <Subtitle className={"mt-14 text-center"}>Il Blog di Dario D&apos;Angelo {electionData.in_progress ? "• Aggiornato alle " + (new Date(electionData.last_update)).toLocaleString() : ""} • Fonte {electionData.source}</Subtitle>
    </div>
  )
}