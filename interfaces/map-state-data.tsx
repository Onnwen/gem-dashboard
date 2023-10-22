import Party from './party';

export interface MapStateData {
  id: number;
  name: string;
  parties: Party[];
  most_wins: Party;
  color: string;
  geo_url: string;
}