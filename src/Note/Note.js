import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';
import './Note.css'

//1. any way to put button in link
//2. any way to directly use context

class Note extends React.Component {
    handleClick(id, history) {
        this.context.deleteNote(id, history)
    }
    render() {
        const id = this.props.id;
        return (
            <div className='note'>
                <Link to={'/note/' + id}>
                    <h2>{this.props.title}</h2>
                    <div className='note-body'>
                        <p>Date modified on {this.props.date}</p>
                    </div>
                </Link>
                <div className='note-body'>
                    <button onClick={() => this.handleClick(id, this.props.history)}>
                        Delete Note
                    </button>
                </div>
            </div>
        )
    }
}

Note.propTypes = {
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}
export default withRouter(Note);
Note.contextType = NotesContext;