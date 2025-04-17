import { Film } from 'src/app/core/interfaces/films.interface';

export const mockFilm: Film = {
  id: '1',
  title: 'Mock Film',
  year: 2022,
  synopsis: 'Mock synopsis.',
  director: { id: 'd1', name: 'Mock Director' },
  gender: { id: 'g1', name: 'Mock Genre' },
  cover: 'mock-cover.jpg',
  poster_url: 'mock-poster.jpg',
  was_watched: false,
  rating: 4.5,
  actors: [
    { id: 'a1', name: 'Actor One' },
    { id: 'a2', name: 'Actor Two' },
  ],
};

export const mockFilms: Film[] = [
  {
    title: 'Drive',
    synopsis:
      'A prototype enhanced human, on the run from Chinese-hired hit men, hooks up with a dread-locked bystander, and the two of them elude their pursuers narrowly each time.',
    year: 1997,
    director: {
      id: '6423910681835624258',
      name: 'Mark Dacascos',
    },
    gender: {
      id: '5673693341140147561',
      name: 'gender default',
    },
    cover: 'assets/images/temp/cards/drive-cover.jpg',
    was_watched: false,
    rating: 3,
    actors: [
      {
        id: '6423910681835624258',
        name: 'Mark Dacascos',
      },
      {
        id: '12671016886590266669',
        name: 'Kadeem Hardison',
      },
      {
        id: '12039611290891670486',
        name: 'John Pyper-Ferguson',
      },
      {
        id: '13184388871992858153',
        name: 'Brittany Murphy',
      },
      {
        id: '11256182331831376635',
        name: 'Tracey Walter',
      },
    ],
    poster_url: 'assets/images/temp/posters/drive-poster.jpg',
    id: '1',
  },
  {
    title: 'Mysterious Skin',
    synopsis:
      'A teenage hustler and a young man obsessed with alien abductions cross paths, together discovering a horrible, liberating truth.',
    year: 2004,
    director: {
      id: '3339416782209307937',
      name: 'Joseph Gordon-Levitt',
    },
    gender: {
      id: '5673693341140147561',
      name: 'gender default',
    },
    cover: 'assets/images/temp/cards/mysterious-skin-cover.jpg',
    was_watched: false,
    rating: 3,
    actors: [
      {
        id: '3339416782209307937',
        name: 'Joseph Gordon-Levitt',
      },
      {
        id: '1563081563033525666',
        name: 'Brady Corbet',
      },
      {
        id: '9132177978273651793',
        name: 'Michelle Trachtenberg',
      },
      {
        id: '10283611075315261231',
        name: 'Jeffrey Licon',
      },
      {
        id: '1921744841046446910',
        name: 'Mary Lynn Rajskub',
      },
    ],
    poster_url: 'assets/images/temp/posters/mysterious-skin-poster.jpg',
    id: '2',
  },
];
