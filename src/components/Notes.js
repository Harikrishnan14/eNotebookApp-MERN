import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {

    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context

    let navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        } else {
            navigate("/login")
        }
        // eslint-disable-next-line
    }, []);

    const [note, setNote] = useState({ id: "", utitle: "", utag: "", udescription: "" })

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, utitle: currentNote.title, utag: currentNote.tag, udescription: currentNote.description })
    }

    const ref = useRef(null)
    const refClose = useRef(null)

    const handleClick = (e) => {
        editNote(note.id, note.utitle, note.utag, note.udescription)
        refClose.current.click()
        props.showAlert("success", "Updated Successfully")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
        
            <AddNote showAlert={props.showAlert} />
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="utitle" name="utitle" aria-describedby="emailHelp" onChange={onChange} value={note.utitle} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="utag" name="utag" onChange={onChange} value={note.utag} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="udescription" name="udescription" rows="5" onChange={onChange} value={note.udescription} minLength={5} required style={{ resize: "none" }} ></textarea>
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick} disabled={note.utitle.length < 5 || note.udescription.length < 5}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-5" style={{ margin: "0px" }}>
                <h2 className="text-center mb-3">Your Notes</h2>
                <div className="container text-center  text-secondary">
                    {notes.length === 0 && "No Notes to Display!"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}

export default Notes
