export interface Film {
    id:          number;
    title:       string;
    sinopsis:    string;
    year:        number;
    director:    Director;
    genero:      Director;
    cover:       string;
    was_watched: boolean;
    rating:      number;
    actors:      Director[];
}

export interface Director {
    id:   number;
    name: string;
}
