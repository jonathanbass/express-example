import mongoose from "mongoose";

type MovieGenre = "Science Fiction" | "Drama" | "Fantasy" | "Action" | "Horror" | "Comedy" | "Romance" | "Documentary";

export interface IMovie extends mongoose.Document {
    Title: string;
    Year: number;
    Runtime: number;
    Genre: MovieGenre[];
    Cast: string[];
}

export const MovieModel = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    year: {
        required: true,
        type: Number
    },
    runtime: {
        required: true,
        type: Number
    },
    genre: {
        required: true,
        type: Array<MovieGenre>
    },
    cast: {
        required: true,
        type: Array<String>
    },
});

const Movie = mongoose.model<IMovie>("Movie", MovieModel);
export default Movie;
