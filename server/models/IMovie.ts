type MovieGenre = "Science Fiction" | "Drama" | "Fantasy" | "Action" | "Horror" | "Comedy" | "Romance" | "Documentary";

export interface IMovie {
    id?: string;
    title: string;
    year: number;
    runtime: number;
    genre: MovieGenre[];
    cast: string[];
}
