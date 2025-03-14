export interface Film {
    id:          number;
    title:       string;
    sinopsis:    string;
    year:        number;
    director:    Entity;
    genero:      Entity;
    cover:       string;
    was_watched: boolean;
    rating:      number;
    actors:      Entity[];
}

export interface Entity {
    id:   number;
    name: string;
}
