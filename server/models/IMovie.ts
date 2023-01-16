type MovieGenre = "Science Fiction" | "Drama" | "Fantasy" | "Action" | "Horror" | "Comedy" | "Romance" | "Documentary";

export interface IMovie {
    Title: string;
    Year: number;
    Runtime: number;
    Genre: MovieGenre[];
    Cast: string[];
}
