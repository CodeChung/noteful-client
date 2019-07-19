import React from 'react';
import Note from '../Note/Note';
import NotesContext from '../NotesContext';
import PropTypes from 'prop-types';

class NotePage extends React.Component {
    static contextType = NotesContext;
    render() {
        const id = this.props.match.params.folderId;
        const notes = this.context.notes;
        const folderNotes = notes.filter(note => note.folder_id == id)
            .map((note, index) => {
                const date = new Date(note.date_created).toDateString();
                const title = note.title;
                const content = note.content;
                const id = note.id;
                return <Note key={index} date={date} title={title} content={content} id={id}/>
            })
        return (
            <div>
                {folderNotes}
            </div>
        )
    }
}

NotePage.propTypes = {
    match: PropTypes.shape({params: PropTypes.shape({folderId: PropTypes.string.isRequired})})
}

export default NotePage;