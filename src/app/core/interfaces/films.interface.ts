export interface Film {
  id: string;
  title: string;
  synopsis: string;
  year: number;
  director: Entity;
  gender: Entity;
  cover: string;
  poster_url: string;
  was_watched: boolean;
  rating: number;
  actors: Entity[];
}

export interface Entity {
  id: string;
  name: string;
}
