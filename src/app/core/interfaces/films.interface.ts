export interface Film {
  id: string;
  title: string;
  sinopsis: string;
  year: number;
  director: Entity;
  genero: Entity;
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
