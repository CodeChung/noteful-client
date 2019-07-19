import React from 'react';
import { Link } from 'react-router-dom';
import './Folder.css';

class Folder extends React.Component {
    render() {
        return (
            <Link to={'/folder/' + this.props.id}><button className='folder'>{this.props.name}</button></Link>
        )
    }
}

export default Folder;