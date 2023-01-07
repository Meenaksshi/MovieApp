import express from "express"
import { addMovie, deleteMovie, getMovies, updateMovie } from "../controllers/movie.js";

const router = express.Router();

router.get("/", getMovies)
router.post("/", addMovie)
router.delete("/:id", deleteMovie)
router.put("/:id", updateMovie)

export default router