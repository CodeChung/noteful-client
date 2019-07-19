import React from 'react';
import NotesContext from '../NotesContext';
import uuidv1 from 'uuid/v1';
import ValidationError from '../Errors/ValidationError';

class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameValid: false,
            formValid: false,
            validationMessages: {
                name: '',
            }
        }
    }
    static contextType = NotesContext;
    updateName(name) {
        this.setState({name}, () => {this.validateName(name)})
    }
    validateName(name) {
        const fieldErrors = {...this.state.validationMessages};
        const folders = this.context.folders;
        let hasError = false;

        if (name.length === 0) {
            fieldErrors.name = 'Name is required';
            hasError = true;
        } else {
            folders.forEach(folder => {
                if (folder.name.toLowerCase() === name.toLowerCase()) {
                    fieldErrors.name = 'Folder name must be unique';
                    hasError = true;
                }
            })
        }

        this.setState({
            nameValid: !hasError,
            validationMessages: fieldErrors
        }, this.formValid );
    }
    formValid() {
        this.setState({
            formValid: this.state.nameValid
        });
    }
    handleSubmit(e) {
        e.preventDefault()
        this.context.addFolder(uuidv1(), this.state.name)
        this.setState({formValid: false})
    }
    render() {
        return (
            <form onSubmit={e => this.handleSubmit(e)}>
                <h2>Add Folder</h2>
                <label htmlFor='name'>Name of Folder</label>
                <input 
                    type='text' 
                    name='name' 
                    id='name' 
                    aria-required='true'
                    aria-describedby='folder-name-error'
                    onChange={(e) => this.updateName(e.target.value)}></input>
                <ValidationError 
                    hasError={!this.state.nameValid} 
                    message={this.state.validationMessages.name}
                    id='folder-name-error'/>
                <button type='submit' disabled={!this.state.formValid}>Create Folder</button>
            </form>
        )
    }
}

export default AddFolder;