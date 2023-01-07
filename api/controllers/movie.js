import { db } from "../db.js"
import jwt from "jsonwebtoken";

export const getMovies = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = "SELECT * FROM movie WHERE `uid` = ?"

        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
}

export const addMovie = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const q = "SELECT * FROM movie WHERE moviename = ? AND `uid` = ?"

        db.query(q, [req.body.moviename, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length) return res.status(500).json("Movie already exists!");

            const q = "INSERT INTO `movie`(`moviename`, `rating`, `cast`, `genre`, `releasedate`, `uid`) VALUES (?)"
            const values = [
                req.body.moviename,
                req.body.rating,
                req.body.cast,
                req.body.genre,
                req.body.releasedate,
                userInfo.id
            ]

            db.query(q, [values], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json(data);
            })
        })
    })
}

export const deleteMovie = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const movieId = req.params.id;
        const q = "DELETE FROM movie WHERE `id` = ? AND `uid` = ?"

        db.query(q, [movieId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("This movie can't be deleted - invalid user")

            return res.json("Movie has been deleted!");
        })
    })
}

export const updateMovie = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")

        const movieId = req.params.id
        const q = "SELECT * FROM movie WHERE `id` = ? AND `uid` = ?"

        db.query(q, [movieId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length == 0) return res.status(500).json("Movie does not exist!");

            const q = "UPDATE `movie` SET `moviename`= ?, `rating` = ?, `cast` = ?, `genre` = ?, `releasedate` = ? WHERE `id` = ? AND `uid` = ?";
            const values = [
                req.body.moviename,
                req.body.rating,
                req.body.cast,
                req.body.genre,
                req.body.releasedate.substr(0, 10),
            ]

            db.query(q, [...values, movieId, userInfo.id], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json("Movie has been updated!");
            })
        })
    })
}