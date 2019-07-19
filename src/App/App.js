import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import NotePage from '../NotePage/NotePage';
import FolderList from '../FolderList/FolderList';
import FolderNotes from '../FolderNotes/FolderNotes';
import NotesContext from'../NotesContext';
import { Link } from 'react-router-dom';
import './App.css';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import { getNotes, getFolders, deleteNote, addNote, addFolder } from '../MethodRouter';

//move all methods this into separate file; try to move state into context

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      folders: [],
      notes: [],
    }
    this.getFolders = this.getFolders.bind(this)
    this.addFolder = this.addFolder.bind(this)
    this.getNotes = this.getNotes.bind(this)
    this.addNote = this.addNote.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
  }
  componentDidMount() {
    this.getFolders()
    this.getNotes()
  }
  deleteNote = deleteNote;
  getNotes = getNotes;
  addNote = addNote;
  getFolders = getFolders;
  addFolder = addFolder;
  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addNote: this.addNote,
      addFolder: this.addFolder,
    }
    return (
      <NotesContext.Provider value={contextValue}>
        <header className="App-header">
          <Link to='/'><h1>Noteful</h1></Link>
        </header>
        <main>
          <section className='sidebar'>
            <FolderList folders={this.state.folders}/>
          </section>
          <section className='main-display'>
            <Switch>
              <Route exact path='/' component={Main}/>
              <Route path='/folder/:folderId' component={(props) => <FolderNotes match={props.match}/>}/>
              <Route path='/note/:noteId' component={(props) => <NotePage match={props.match}/>}/>
              <Route path='/addFolder' component={AddFolder}/>
              <Route path='/addNote' component={AddNote}/>
            </Switch>
          </section>
        </main>
      </NotesContext.Provider>
    );
  }
  
}

export default App;
