import React, { useState } from 'react'
import NoteContext from './noteContext'


const NoteState = (props) => {

  const host = "http://localhost:5000"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)



  //Get All Notes
  const getNotes = async () => {

    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });

    const json = await response.json()
    setNotes(json)
  }


 
  //Add a Note
  const addNote = async (title, tag, description) => {

    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, tag, description}), // body data type must match "Content-Type" header
    });

    const note = await response.json()
    setNotes(notes.concat(note))
  }



  //Delete a Note
  const deleteNote = async (id) => {

    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    // eslint-disable-next-line
    const json = response.json(); // parses JSON response into native JavaScript objects
    

    // Logic to delete in client
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }



  //Edit a Note
  const editNote = async (id, title, tag, description) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, tag, description }), // body data type must match "Content-Type" header
    });
    // eslint-disable-next-line
    const json = await response.json(); // parses JSON response into native JavaScript objects

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].tag = tag
        newNotes[index].description = description
        break;
      }
    }
    setNotes(newNotes)
  }



  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;