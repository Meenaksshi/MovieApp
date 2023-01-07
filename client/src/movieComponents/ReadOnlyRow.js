import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { fontSize } from '@mui/system';

const ReadOnlyRow = ({ movie, handleEditClick, handleDeleteClick, editFormErr }) => {
    return (
        <tr>
            <td>{movie.moviename}</td>
            <td>{movie.rating}</td>
            <td>
                {JSON.parse(movie.cast).map(name => (
                    <li>{name}</li>
                ))}
            </td>
            <td>{movie.genre}</td>
            <td>{movie.releasedate.substr(0, 10)}</td>
            <td>
                <button type='button' className='button' onClick={e => handleEditClick(e, movie)}><EditIcon color="primary" style={{ fontSize: "20px" }} /></button>

                <button type='button' className='button' onClick={e => handleDeleteClick(e, movie.id)}><DeleteIcon color="primary" style={{ fontSize: "20px" }}></DeleteIcon></button>
                {editFormErr && <p>{editFormErr}</p>}


            </td>
        </tr>
    )
}

export default ReadOnlyRow