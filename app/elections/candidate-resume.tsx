'use client';

import React from 'react';
import { Badge, Card, Metric, Subtitle, Title, Text } from '@tremor/react';
import Image from 'next/image';

export default function CandidateResume({ candidateData }) {
  return (
    <div className={"flex flex-col justify-center items-center"}>
      <Image src={candidateData.candidate_image_url} alt={candidateData.candidate_first_name} width={75}
             height={75} className={`rounded-full border-slate-200 border-2 aspect-square object-cover place-self-center shadow-lg`}/>
      <Title className={"mt-2 text-xl"}><span className={"opacity-60"}>{candidateData.candidate_first_name}</span> {candidateData.candidate_last_name}</Title>
      <Text className={"text-center mx-10 mb-2 mt-1 text-sm"}>{candidateData.candidate_description}</Text>
      <Badge color={candidateData.party_color_name} size="sm" className={"mt-1 text-sm"}>{candidateData.party_italian_name} • {candidateData.total_votes_percentage}%</Badge>
    </div>
  );
}