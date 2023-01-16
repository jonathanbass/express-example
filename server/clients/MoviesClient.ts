import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";
import { IMovie } from "./models/IMovie";

export class MoviesClient {
    private client: MongoClient;

    private constructor () {
        dotenv.config();
        const connection = process.env.DATABASE_URL || ".";
        this.client = new MongoClient(connection);
    }

    public static Create = async () => {
        const instance = new MoviesClient();
        await instance.client.connect();

        return instance;
     };

    GetMovie = async (id: string) => {
        const idQuery = {"_id": new ObjectId(id)};
        const movie = await this.client.db("movies").collection("movies").findOne(idQuery);

        return movie;
    }

    GetMovies = async () => {
        const movies = await this.client.db("movies").collection("movies").find().toArray();
        return movies;
    }

    CreateMovie = async (movie: IMovie) => {
        const document = await this.client.db("movies").collection("movies").insertOne(movie);
        return document.insertedId;
    }

    UpdateMovie = async (id: string, updatedMovie: IMovie) => {
        const idQuery = {"_id": new ObjectId(id)};
        await this.client.db("movies").collection("movies").updateOne(idQuery, { $set: updatedMovie });
    }

    DeleteMovie = async (id: string) => {
        const idQuery = {"_id": new ObjectId(id)};
        await this.client.db("movies").collection("movies").deleteOne(idQuery);
    }
}
