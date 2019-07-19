import React from 'react';
import { Link } from 'react-router-dom';
import Folder from '../Folder/Folder';
import PropTypes from 'prop-types';

class FolderList extends React.Component {
    render() {
        const folders = this.props.folders
                .map((folder, index) => {
                    const name = folder.name;
                    const id = folder.id;
                    return <Folder key={index} name={name} id={id}/>
                })
        return (
            <div className='folder-list'>
                {folders}
                <Link to='/addFolder'><button>Add Folder</button></Link>
                <Link to='/addNote'><button>Add Note</button></Link>
            </div>
        )
    }
}

FolderList.propTypes = {
    folders: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }))
}

export default FolderList;