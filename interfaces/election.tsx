export default interface Election {
  id: number;
  name: string;
  start_date: Date;
  end_date: Date;
  in_progress: boolean;
  source: string;
}