/*global  morgan:true require:true*/
/*eslint no-undef: "error"*/
/*eslint no-console: ["error", { allow: ["log", "error"] }] */

const express = require('express');
  morgan = require('morgan');
  bodyParser = require('body-parser');
  //uuid = require('uuid');


const app = express();

//Invoke middleware functions
app.use(express.static('public'));
app.use(morgan('common'));

//Error handling middleware functions
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  next();
});

let movies = [
  {
    title: 'I am Legend',
    description:
      'Years after a plague kills most of humanity and transforms the rest into monsters, the sole survivor in New York City struggles valiantly to find a cure.',
    genre: 'Drama',
    director: {
      name: 'Francis Lawrence',
      bio:
        'He is a director and producer, after establishing himself as a director of music videos and commercials, Lawrence made his feature length directorial debut with the supernatural thriller Constantine.',
      birthyear: '1971',
      deathyear: 'N/A',
      movies: ['Catching Fire', 'Constantine']
    },
    actors: ['Will smith', 'Alice Braga', 'Charlie Tahan'],
    releaseYear: '2006',
    imageURL: 'https://www.imdb.com/title/tt0480249/mediaviewer/rm2203650560'
  },

  {
    title: 'Lucky Number Slevin',
    description:
      'A case of mistaken identity lands Slevin into the middle of a war being plotted by two of the city\'s most rival crime bosses: The Rabbi and The Boss.',
    genre: 'Thriller',
    director: {
      name: 'Paul McGuigan',
      bio:
        'a Scottish film and television director, best known for directing films such as Lucky Number Slevin',
      birthyear: '1963',
      deathyear: 'N/A',
      movies: ['Lucky Number Slevin', 'Wicker Park']
    },
    actors: ['Josh Hartnett', 'Ben Kingsley', 'Morgan Freeman'],
    releaseYear: '2006',
    imageURL: 'https://www.imdb.com/title/tt0425210/mediaviewer/rm288767744'
  },

  {
    title: 'Lion',
    description:
      'A five-year-old Indian boy gets lost on the streets of Calcutta, thousands of kilometers from home. He survives many challenges before being adopted by a couple in Australia',
    genre: 'Biography',
    director: {
      name: 'Garth Davis',
      bio:
        'Garth Davis is a renowned film, television and commercials director whose feature directorial debut Lion was nominated for six Academy Awards including Best Picture.',
      birthyear: '1974',
      deathyear: 'N/A',
      movies: ['Lion', 'Mary Magdalene']
    },
    actors: ['Dev Patel', 'Nicole Kidman', 'Rooney Mara'],
    releaseYear: '2016',
    imageURL: 'https://www.imdb.com/title/tt3741834/mediaviewer/rm2445410304'
  },

  {
    title: 'Pulp Fiction',
    description:
      'The lives of two mob hitmen, a boxer, a gangster & his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    genre: 'Crime',
    director: {
      name: 'Quentin Tarantino',
      bio:
        'American filmmaker and actor. His films are characterized by nonlinear storylines, satirical subject matter, an aestheticization of violence, extended scenes of dialogue, ensemble casts consisting of established and lesser-known performers, references to popular culture and a wide variety of other films, soundtracks primarily containing songs and score pieces from the 1960s to the 1980s, and features of neo-noir film.',
      birthyear: '1963',
      deathyear: 'N/A',
      movies: ['Pulp Fiction', 'Kill Bill']
    },
    actors: ['John Travolta', ' Uma Thurman', 'Samuel L. Jackson'],
    releaseYear: '1994',
    imageURL: 'https://www.imdb.com/title/tt0110912/mediaviewer/rm1959546112'
  },

  {
    title: 'Lord of the Rings: The Fellowship of the Ring',
    description:
      'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
    genre: 'Adventure',
    director: {
      name: 'Peter Jackson',
      bio:
        'Peter Jackson was born as an only child in a small coast-side town in New Zealand. When a friend of his parents bought him a super 8 movie camera, the then eight-year-old Peter instantly grabbed the thing to start recording his own movies, which he made with his friends.',
      birthyear: '1961',
      deathyear: 'N/A',
      movies: ['Lord of the Rings', 'Heavenly Creatures', 'Dead Alive']
    },
    actors: ['Elijah Wood', 'Ian McKellen', 'Orlando Bloom'],
    releaseYear: '2001',
    imageURL: 'https://www.imdb.com/title/tt0120737/mediaviewer/rm3592958976'
  },

  {
    title: 'Boyz n the Hood',
    description:
      'Follows the lives of three young males living in the Crenshaw ghetto of Los Angeles, dissecting questions of race, relationships, violence and future prospects.',
    genre: 'Drama',
    director: {
      name: 'John Singleton',
      bio:
        ' John Singleton attended the Film Writing Program at USC, after graduating from high school in 1986. While studying there, he won three writing awards from the university, which led to a contract with Creative Artists Agency during his sophomore year.',
      birthyear: '1968',
      deathyear: '2019',
      movies: ['Boyz n the Hood', '2 Fast 2 Furious', 'Four Brothers']
    },
    actors: ['Cuba Gooding Jr.', 'Laurence Fishburne', 'Hudhail Al-Amir'],
    releaseYear: '1991',
    imageURL: 'https://www.imdb.com/title/tt0101507/mediaviewer/rm3732341248'
  },

  {
    title: 'Gladiator',
    description:
      'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
    genre: 'Action',
    director: {
      name: 'Ridley Scott',
      bio:
        'His father was an officer in the Royal Engineers and the family followed him as his career posted him throughout the United Kingdom and Europe before they eventually returned to Teesside. Scott wanted to join the Royal Army (his elder brother Frank had already joined the Merchant Navy) but his father encouraged him to develop his artistic talents instead and so he went to West Hartlepool College of Art and then London\'s Royal College of Art where he helped found the film department.',
      birthyear: '1937',
      deathyear: 'N/A',
      movies: ['Gladiator', 'Alien', 'Blade Runner']
    },
    actors: ['Russell Crowe', 'Joaqui Phoenix', 'Connie Nielsen'],
    releaseYear: '2000',
    imageURL: 'https://www.imdb.com/title/tt0172495/mediaviewer/rm2442542592'
  },

  {
    title: 'ATL',
    description:
      'As four friends prepare for life after high school, different challenges bring about turning points in each of their lives. The dramas unfold and resolve at their local rollerskating rink, Cascade.',
    genre: 'Drama',
    director: {
      name: 'Chris Robinson',
      bio:
        'Award-winning director Chris Robinson delivers imagery for commercial, music video, feature film and digital platforms. Robinson\'s commercial work includes campaigns for global brands like Reebok, Orange, Mountain Dew, Budweiser, Kodak, Gatorade, Apple, Coca-Cola, and Verizon.',
      birthyear: 'N/A',
      deathyear: 'N/a',
      movies: ['ATL', 'Beats']
    },
    actors: ['T.I.', 'Lauren London', 'Evan Ross'],
    releaseYear: '2006',
    imageURL: 'https://www.imdb.com/title/tt0466856/mediaviewer/rm2710187264'
  },

  {
    title: 'City of God',
    description:
      'In the slums of Rio, two kids paths diverge as one struggles to become a photographer and the other a kingpin.',
    genre: 'Crime',
    director: {
      name: 'Fernando Meirelles',
      bio:
        'He studied architecture at the university of São Paulo. At the same time he developed an interest in filmmaking. With a group of friends he started producing experimental videos. They won a huge number of awards in Brazilian film festivals. After that, the group formed a small independent company called Olhar Eletrônico.',
      birthyear: '1955',
      deathyear: 'N/A',
      movies: ['City of God', 'Brasilia']
    },
    actors: ['Alexandre Rodrigues', 'Leandro Firmino', 'Matheus Nachtergaele'],
    releaseYear: '2002',
    imageURL: 'https://www.imdb.com/title/tt0317248/mediaviewer/rm3233433856'
  },

  {
    title: 'Troy',
    description:
      'An adaptation of Homer\'s great epic, the film follows the assault on Troy by the united Greek forces and chronicles the fates of the men involved.',
    genre: 'Drama',
    director: {
      name: 'Wolfgang Petersen',
      bio:
        'This director seems to shine most when making movies that can best be described as part action movies/part disaster movies.',
      birthyear: '1941',
      deathyear: 'N/A',
      movies: ['Outbreak', 'The Swarm']
    },
    actors: ['Brad Pitt', 'Eric Bana', 'Oralndo Bloom'],
    releaseYear: '2004',
    imageURL: 'https://www.imdb.com/title/tt0332452/mediaviewer/rm1089572096'
  }
];

let directors = [ 
  {
    name: 'Wolfgang Petersen',
    bio:
      'This director seems to shine most when making movies that can best be described as part action movies/part disaster movies.',
    birthyear: '1941',
    deathyear: 'N/A',
    movies: ['Outbreak', 'The Swarm']
  },

  {
    name: 'Fernando Meirelles',
    bio:
      'He studied architecture at the university of São Paulo. At the same time he developed an interest in filmmaking. With a group of friends he started producing experimental videos. They won a huge number of awards in Brazilian film festivals. After that, the group formed a small independent company called Olhar Eletrônico.',
    birthyear: '1955',
    deathyear: 'N/A',
    movies: ['City of God', 'Brasilia']
  },

  {
    name: 'Chris Robinson',
    bio:
      'Award-winning director Chris Robinson delivers imagery for commercial, music video, feature film and digital platforms. Robinson\'s commercial work includes campaigns for global brands like Reebok, Orange, Mountain Dew, Budweiser, Kodak, Gatorade, Apple, Coca-Cola, and Verizon.',
    birthyear: 'N/A',
    deathyear: 'N/a',
    movies: ['ATL', 'Beats']
  },

  {
    name: 'Ridley Scott',
    bio:
      'His father was an officer in the Royal Engineers and the family followed him as his career posted him throughout the United Kingdom and Europe before they eventually returned to Teesside. Scott wanted to join the Royal Army (his elder brother Frank had already joined the Merchant Navy) but his father encouraged him to develop his artistic talents instead and so he went to West Hartlepool College of Art and then London\'s Royal College of Art where he helped found the film department.',
    birthyear: '1937',
    deathyear: 'N/A',
    movies: ['Gladiator', 'Alien', 'Blade Runner']
  },

  {
    name: 'John Singleton',
    bio:
      ' John Singleton attended the Film Writing Program at USC, after graduating from high school in 1986. While studying there, he won three writing awards from the university, which led to a contract with Creative Artists Agency during his sophomore year.',
    birthyear: '1968',
    deathyear: '2019',
    movies: ['Boyz n the Hood', '2 Fast 2 Furious', 'Four Brothers']
  },

  {
    name: 'Peter Jackson',
    bio:
      'Peter Jackson was born as an only child in a small coast-side town in New Zealand. When a friend of his parents bought him a super 8 movie camera, the then eight-year-old Peter instantly grabbed the thing to start recording his own movies, which he made with his friends.',
    birthyear: '1961',
    deathyear: 'N/A',
    movies: ['Lord of the Rings', 'Heavenly Creatures', 'Dead Alive']
  },

  {
    name: 'Quentin Tarantino',
    bio:
      'American filmmaker and actor. His films are characterized by nonlinear storylines, satirical subject matter, an aestheticization of violence, extended scenes of dialogue, ensemble casts consisting of established and lesser-known performers, references to popular culture and a wide variety of other films, soundtracks primarily containing songs and score pieces from the 1960s to the 1980s, and features of neo-noir film.',
    birthyear: '1963',
    deathyear: 'N/A',
    movies: ['Pulp Fiction', 'Kill Bill']
  },

  {
    name: 'Garth Davis',
    bio:
      'Garth Davis is a renowned film, television and commercials director whose feature directorial debut Lion was nominated for six Academy Awards including Best Picture.',
    birthyear: '1974',
    deathyear: 'N/A',
    movies: ['Lion', 'Mary Magdalene']
  },

  {
    name: 'Paul McGuigan',
    bio:
      'a Scottish film and television director, best known for directing films such as Lucky Number Slevin',
    birthyear: '1963',
    deathyear: 'N/A',
    movies: ['Lucky Number Slevin', 'Wicker Park']
  },

  {
    name: 'Francis Lawrence',
    bio:
      'He is a director and producer, after establishing himself as a director of music videos and commercials, Lawrence made his feature length directorial debut with the supernatural thriller Constantine.',
    birthyear: '1971',
    deathyear: 'N/A',
    movies: ['Catching Fire', 'Constantine']
  },

];

let users = [
  {
    username: 'Mia',
    password: 'hellopassword',
    email: '456@gmail.com',
    birthdate: '01/01/2000',
    favoritemovies:[]
  },
  {
    username: 'Tay',
    password: 'yopassword',
    email: '789@gmail.com',
    birthdate: '02/01/1994',
    favoritemovies:[]
  },
  {
    username: 'Ray',
    password: 'yellopassword',
    email: '123@gmail.com',
    birthdate: '03/01/1999',
    favoritemovies:[]
  }

];

//Returns a JSON object containing data about all movies
app.get('/movies', function(req, res) {
  res.json(movies);
});

//Return JSON object about a single movie selcted by the user via title
app.get('/movies/:title', function(req, res) {
  res.json(movies.find(function(movie) {
    return movie.title === req.params.title
}));
});

// Return the genre of the movie selected
app.get('/movies/:title/genre', function(req, res) {
  let movie = movies.find(function(movie) {
    return movie.title === req.params.title
  });

  if (movie) {
    res.status(201).send('The genre of ' + movie.title + ' is ' + movie.genre)
  } else {
    res.status(404).send('Movie without the title ' + req.params.title + 'was not found');
  }
});

//Return text response about a director (bio, birth year, death year) that was selected by the user
app.get('/directors/:name', function(req, res) {
  let director = directors.find(function(directors) {
    return directors.name === req.params.name
  });

  if(director) {
    res.status(201).send( req.params.name + ' was born in ' + director.birthyear + ' their death year was ' + director.deathyear + ' and this is a short summary of their bioraphy: ' + director.bio )
  } else {
    res.status(404).send( req.params.name + 'was not found');
  }
});

//Allows new users to register
app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.username) {
    const message = 'Missing username';
    res.status(400).send(message);
  } else {
    
    users.push(newUser);
    res.status(201).send(newUser);
  }
});



app.listen(3007);

console.log('yup');
