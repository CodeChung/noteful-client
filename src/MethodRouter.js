function getNotes() {
    fetch("http://localhost:8000/api/notes")
        .then(resp => {
        if (!resp.ok) {
            throw new Error(resp.error)
        }
        return resp.json()
        })
        .then(resp => {
        this.setState({notes: resp})
        })
        .catch(err => {
        alert(err)
        })
}

function getFolders() {
    fetch("http://localhost:8000/api/folders")
        .then(resp => {
        if (!resp.ok) {
            throw new Error(resp.error)
        }
        return resp.json()
        })
        .then(resp => {
        this.setState({folders: resp})
        })
        .catch(err => {
        alert(err)
        })
}

function deleteNote(id, history) {
    fetch(`http://localhost:8000/api/notes/${id}`, {
      method: 'delete'
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.err)
        } else {
          this.getNotes();
          return Promise.resolve(true);
        }
      })
      .then(resp => {
        history.push('/')
      })
      .catch(err => alert(err))
}

function addNote(id, title, folder_id, content, history) {
    const date = new Date().toISOString();
    const body = JSON.stringify({id, title, folder_id, content, modified: date});
    fetch('http://localhost:8000/api/notes',
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: body
      }
    )
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.error)
        }
        console.log('resp',resp.json())
      })
      .then(resp => {
        this.getNotes();
      })
      .then(resp => history.push(`/folder/${folder_id}`))
      .catch(err => {
        alert(err)
      })
}

function addFolder(id, name) {
    const body = JSON.stringify({id: id, name: name})
    fetch('http://localhost:8000/api/folders',
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: body
      }
    )
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.error)
        }
        return resp.json()
      })
      .then(resp => {
        this.getFolders();
      })
      .catch(err => {
        alert(err)
      })
}

export { getNotes, getFolders, deleteNote, addNote, addFolder };