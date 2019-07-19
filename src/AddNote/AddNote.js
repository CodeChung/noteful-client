import React from 'react';
import uuidv1 from 'uuid/v1';
import ValidationError from '../Errors/ValidationError';
import NotesContext from '../NotesContext';

class AddNote extends React.Component {
    static contextType = NotesContext;
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            folderId: '',
            nameValid: false,
            contentValid: false,
            folderIdValid: false,
            formValid: false,
            validationMessages: {
                title: '',
                content: '',
                folderId: '',
            }
        }
    };
    
    updateName(title) {
        this.setState({title}, () => this.validateName(title))
    }
    updateFolder(folderId) {
        this.setState({folderId}, () => this.validateFolder(folderId))
    }
    updateContent(content) {
        this.setState({content}, () => this.validateContent(content))
    }
    validateName(name) {
        const errorMessage = {...this.state.validationMessages};
        let hasError = false;
        if (name.length === 0) {
            errorMessage.name = 'Name must not be blank';
            hasError = true;
        }
        if (name.length > 500) {
            errorMessage.name = 'Name must be less than 500 characters';
            hasError = true;
        }
        this.setState({
            validationMessages: errorMessage, 
            nameValid: !hasError
        }, this.formValid)
    }
    validateFolder(folderId) {
        const errorMessage = {...this.state.validationMessages};
        let hasError = false;
        if (!folderId) {
            errorMessage.folderId = 'Please choose a folder';
            hasError = true;
        }
        this.setState({
            validationMessages: errorMessage, 
            folderIdValid: !hasError
        }, this.formValid)
    }
    validateContent(content) {
        const errorMessage = {...this.state.validationMessages};
        let hasError = false;
        if (!content) {
            errorMessage.content = 'Note cannot be blank';
            hasError = true;
        }
        this.setState({
            validationMessages: errorMessage, 
            contentValid: !hasError
        }, this.formValid)
    }
    formValid() {
        this.setState({formValid: this.state.nameValid && this.state.contentValid && this.state.folderIdValid})
    }
    handleSubmit(e) {
        e.preventDefault()
        const id = uuidv1();
        const { title, content, folderId } = this.state;
        this.context.addNote(id, title, folderId, content, this.props.history)
    }
    render() { 
        const folders = this.context.folders.map(folder => {
            return <option key={folder.id} value={folder.id}>{folder.name}</option>
        })
        return (
            <form className='note-form' onSubmit={(e) => this.handleSubmit(e)}>
                <label htmlFor='note-name'>Name</label>
                <input 
                    type='text' 
                    id='note-name' 
                    name='note-name'
                    aria-required='true'
                    aria-describedby='note-name-error'
                    onChange={(e) => this.updateName(e.target.value)}/>
                <ValidationError 
                    hasError={!this.state.nameValid} 
                    message={this.state.validationMessages.name}
                    id='note-name-error'/>
                <label htmlFor='note-folder'>Folder</label>
                <select onChange={(e) => this.updateFolder(e.target.value)} id='note-folder' name='note-folder'>
                    <option value=''>--</option>
                    {folders}
                </select>
                <ValidationError hasError={!this.state.folderIdValid} message={this.state.validationMessages.folderId}/>
                <label htmlFor='note-content'>Note</label>
                <textarea rows={5} onChange={(e) => this.updateContent(e.target.value)} name='note-content' id='note-content'/>
                <ValidationError hasError={!this.state.contentValid} message={this.state.validationMessages.content}/>
                <button disabled={!this.state.formValid}>Create Note</button>
            </form>
        )
    };
}

export default AddNote;