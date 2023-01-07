import { useEffect, useState, React, Fragment } from 'react'
import axios from 'axios';
import ReadOnlyRow from '../movieComponents/ReadOnlyRow.js';
import EditableRow from '../movieComponents/EditableRow.js';

const Movie = () => {
    const [movies, setMovies] = useState([]);
    const [inputs, setInputs] = useState({
        moviename: "",
        rating: '',
        cast: "",
        genre: "",
        releasedate: "",
    })

    const [editFormData, setEditFormData] = useState({
        moviename: "",
        rating: '',
        cast: "",
        genre: "",
        releasedate: "",
    })

    const [err, setError] = useState(null);

    const [editFormErr, setEditFormError] = useState(null);

    const [editMovieId, setEditMovieId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/movies")
                setMovies(res.data);
            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    }, []);

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleEditFormChange = e => {
        setEditFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if (!(inputs.moviename && inputs.rating && inputs.cast && inputs.genre && inputs.releasedate)) {
            setError("Enter all details!")
        }
        else {
            try {
                await axios.post("http://localhost:8080/api/movies", inputs)
                window.location.reload(true)
            } catch (err) {
                setError(err.response.data)
                console.log(err)
            }
        }
    }

    const handleEditFormSubmit = async e => {
        e.preventDefault();

        if (!(editFormData.moviename && editFormData.rating && editFormData.cast && editFormData.genre && editFormData.releasedate)) {
            setEditFormError("Enter all details!")
        }
        else {
            try {
                await axios.put(`http://localhost:8080/api/movies/${editMovieId}`, editFormData)
                window.location.reload(true)
            } catch (err) {
                setEditFormError(err.response.data)
            }
        }
    }

    const handleEditClick = (e, movie) => {
        e.preventDefault();
        setEditMovieId(movie.id);

        const formValues = {
            moviename: movie.moviename,
            rating: movie.rating,
            cast: movie.cast,
            genre: movie.genre,
            releasedate: movie.releasedate,
        }

        setEditFormData(formValues);
    }

    const handleCancelClick = () => {
        setEditMovieId(null);
    }

    const handleDeleteClick = async (e, movieId) => {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:8080/api/movies/${movieId}`)
            window.location.reload(true)
        } catch (err) {
            setEditFormError(err.response.data)
        }
    }

    return (
        <div className='movie'>
            <div className='newmovie'>Your favourite moives:</div>
            <form onSubmit={handleEditFormSubmit}>
                <table>
                    <thead>
                        <tr>
                            <th>Movie Name</th>
                            <th>Rating</th>
                            <th>Cast</th>
                            <th>Genre</th>
                            <th>Release Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie) => (
                            <Fragment>
                                {editMovieId === movie.id ? (
                                    <EditableRow
                                        editFormData={editFormData}
                                        handleEditFormChange={handleEditFormChange}
                                        handleCancelClick={handleCancelClick}
                                    />
                                ) : (
                                    <ReadOnlyRow
                                        movie={movie}
                                        handleEditClick={handleEditClick}
                                        handleDeleteClick={handleDeleteClick}
                                        editFormErr={editFormErr}
                                    />
                                )}
                            </Fragment>

                        ))}
                    </tbody>
                </table>
            </form>

            <div className='newmovie'>Add a new movie</div>
            <form>
                <input
                    required
                    type="text"
                    name='moviename'
                    placeholder='Movie name'
                    size="20"
                    onChange={handleChange}
                />
                <input
                    required
                    type="number"
                    min="0"
                    max="10"
                    step="0.01"
                    name='rating'
                    placeholder='Rating'
                    onChange={handleChange}
                />
                <input
                    required
                    type="text"
                    name='cast'
                    placeholder='Cast'
                    size="20"
                    onChange={handleChange}
                />
                <input
                    required
                    type="text"
                    name='genre'
                    placeholder='Genre'
                    size="10"
                    onChange={handleChange}
                />
                <label className='label'>Release Date:</label>
                <input
                    required
                    type="date"
                    name='releasedate'
                    onChange={handleChange}
                />
                <button onClick={handleSubmit} className="button add" type="submit">Add</button>
                {err && <p>{err}</p>}
            </form>
        </div>
    )
}

export default Movie