import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
    return (
        <tr>
            <td>
                <input
                    required
                    type="text"
                    name='moviename'
                    placeholder='Movie name'
                    size='10'
                    value={editFormData.moviename}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    required
                    type="number"
                    min="0"
                    max="10"
                    step="0.01"
                    name='rating'
                    placeholder='Rating'
                    value={editFormData.rating}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    required
                    type="text"
                    name='cast'
                    placeholder='Cast'
                    size='10'
                    value={editFormData.cast}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    required
                    type="text"
                    name='genre'
                    placeholder='Genre'
                    size='10'
                    value={editFormData.genre}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    required
                    type="date"
                    name='releasedate'
                    value={editFormData.releasedate.substr(0, 10)}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <button type="submit" className='button'><DoneIcon color="primary" style={{ fontSize: "25px" }} /></button><br></br>
                <button type="button" className='button' onClick={handleCancelClick}><CancelIcon color="primary" style={{ fontSize: "25px" }} /></button>
            </td>
        </tr>
    )
}

export default EditableRow