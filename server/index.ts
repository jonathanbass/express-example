import * as express from "express";
import { MoviesClient } from "./clients/MoviesClient";

(async () => {
    const app = express();
    app.use(express.json());

    const moviesClient = await MoviesClient.Create();

    app.get("/movies/:id", async (req, res) => {
        const movies = await moviesClient.GetMovie(req.params.id);
        res.send(movies);
    });

    app.get("/movies", async (_, res) => {
        const movies = await moviesClient.GetMovies();
        res.send(movies);
    });

    app.post("/movies", async (req, res) => {
        const id = await moviesClient.CreateMovie(req.body);
        res.send(id);
    });

    app.put("/movies/:id", async (req, res) => {
        console.log(req.body);
        await moviesClient.UpdateMovie(req.params.id, req.body);
        res.send();
    });

    app.delete("/movies/:id", async (req, res) => {
        const id = await moviesClient.DeleteMovie(req.params.id);
        res.send();
    });

    const port = process.env.PORT || 3001;

    app.listen(port, () => console.log(`Express API listening on PORT ${port}`));
})();
