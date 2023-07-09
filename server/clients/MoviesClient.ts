import { IMovie } from "../models/IMovie";
import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuidv4 } from "uuid";

export class MoviesClient {
    private documentClient: DynamoDBClient;
    private tableName = "movies"

    private constructor() {
        const dynamoClient = new DynamoDBClient({ region: "eu-west-1" });
        this.documentClient = DynamoDBDocumentClient.from(dynamoClient);
    }

    public static Create = async () => {
        const instance = new MoviesClient();
        return instance;
    };

    GetMovie = async (id: string) => {
        const params = {
            TableName: this.tableName,
            Key: {
                id: {
                    S: id
                }
            }
        };

        const scanCommand = new GetItemCommand(params);
        const data = await this.documentClient.send(scanCommand);
        return unmarshall(data.Item ?? {});
    }

    GetMovies = async () => {
        const scanCommand = new ScanCommand({ TableName: this.tableName });
        const data = await this.documentClient.send(scanCommand);
        return data.Items?.map((item) => unmarshall(item));
    }

    CreateMovie = async (movie: IMovie) => {
        movie.id = uuidv4();

        const params = {
            TableName: this.tableName,
            Item: movie
        };

        await this.documentClient.send(new PutCommand(params));
        return movie.id;
    }

    UpdateMovie = async (id: string, updatedMovie: IMovie) => {

    }

    DeleteMovie = async (id: string) => {

    }
}
