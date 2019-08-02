import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        //Call the superclass constructor
        // so React can initialize it 
        super();

        // Iitialize the state to an empty object so we can destructure it later
        this.state = {
            movie: null,
            selectedMovie: null
        };
    }
    //One fot the "hooks" available in a react component 
    componentDidMount() {
        axios.get('https://murmuring-plateau-43729.herokuapp.com/movies')
            .then(response => { 
            // Assign the result to the state
            this.setState({
                movies:response.data
            });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //Takes users to movie-view
    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    //Takes users back to main-view
    onBackClick(movie) {
        this.setState({
            selectedMovie: null
        });
    }

    //This overrides the render() method of the superclass
    //No need to call super() though, as it does nothing by default
    render() {
        // If the state isn't initialized, this will throw on runtime
        // before the data is initially loaded 
        const {movies, selectedMovie} = this.state;

        //Before the movies have been loaded
        if(!movies) return <div className='main-view'/>;

        return (
            <div className='main-view'>
            {selectedMovie
                ? <MovieView movie={selectedMovie} onClick={button => this.onBackClick()}/>
                : movies.map(movie => ( 
                <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>

            ))}
            </div>
        );
    }
}