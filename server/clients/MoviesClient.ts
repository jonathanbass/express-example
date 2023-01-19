import Movie, { IMovie, MovieModel } from "../models/IMovie";

export class MoviesClient {
    private constructor () {
        
    }

    public static Create = async () => {
        const instance = new MoviesClient();
        return instance;
     };

    GetMovie = async (id: string) => {
        return await Movie.findById(id).select('-__v');
    }

    GetMovies = async () => {
        const movies = await Movie.find().select('-__v');
        return movies;
    }

    CreateMovie = async (movie: IMovie) => {
        const document = new Movie(movie);
        document.save();
        return document.id;
    }

    UpdateMovie = async (id: string, updatedMovie: IMovie) => {
        await Movie.findByIdAndUpdate(
            id, updatedMovie
        );
    }

    DeleteMovie = async (id: string) => {
        await Movie.findByIdAndDelete(id);
    }
}
