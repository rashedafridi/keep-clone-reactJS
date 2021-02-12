import React, { useState } from "react";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";

import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  const [singleNote, setSingleNote] = useState({
    title: "",
    content: "",
    id:-1,
    editmode: false

  });

  function addNote(newNote) {
    if(singleNote.editmode === true)
    {
      const temp_note = [...notes]
      temp_note[singleNote.id] = newNote;
      console.log(temp_note)

      setNotes(prevNotes => {
        return [...temp_note];
      });

      setSingleNote({
      title: "",
      content: "",
      editmode: false,
      id:-1
      })
    }
    else{
          setNotes(prevNotes => {
      return [...prevNotes, newNote];
      });
    }

    
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }
  function editNote(id){

    setSingleNote({
      title: notes[id].title,
      content: notes[id].content,
      id:id,
      editmode : true
    })

  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} title={ singleNote.title } content={ singleNote.content } editmode={singleNote.editmode} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdite={editNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}
export default App;
