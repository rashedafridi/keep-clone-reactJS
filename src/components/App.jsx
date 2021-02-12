import React, { useState , useEffect } from "react";
import axios from 'axios';
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
    _id:-1,
    editmode: false

  });
  useEffect(()=>{
    axios.get( 'http://localhost:4000/articles/' )
          .then( response => {
              const posts = response.data;
              console.log(response);
              console.log(response.data);
                
              setNotes((privNote)=>{
                return posts;
              });
              //console.log(notes);
          } )
          .catch(error => {
               console.log(error);
               console.log("responce faile");
              //setState({error: true});
            });
  },[])

  function addNote(newNote) {
    if(singleNote.editmode === true)
    {
      const temp_note = [...notes]
      temp_note[singleNote.id] = newNote;
      console.log(temp_note)

      setNotes(prevNotes => {
        return [...temp_note];
      });

      const data = new URLSearchParams(); 
      data.append('title',newNote.title);
      data.append('content',newNote.content);
      console.log(singleNote._id);
      axios.patch('http://localhost:4000/articles/'+singleNote._id, data)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
          console.log(error);
          console.log("data entry fail responce faile");
             //setState({error: true});
        });

        setSingleNote({
          title: "",
          content: "",
          editmode: false,
          id:-1,
          _id:-1
          })

    }
    else{
      setNotes(prevNotes => {
        return [...prevNotes, newNote];
      });
      const data = new URLSearchParams(); 
      data.append('title',newNote.title);
      data.append('content',newNote.content);

      console.log("[post]",newNote.title,newNote.content)
      axios.post('http://localhost:4000/articles/', data)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
          console.log(error);
          console.log("data entry fail responce faile");
             //setState({error: true});
      });
    }

    
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });

    axios.delete('http://localhost:4000/articles/' + notes[id]._id )
            .then(response => {
                console.log(response);
            });
    console.log(notes[id]._id)
  }
  function editNote(id){

    setSingleNote({
      title: notes[id].title,
      content: notes[id].content,
      id:id,
      _id:notes[id]._id,
      editmode : true
    })

  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} title={ singleNote.title } content={ singleNote.content } node_id={singleNote.id} />
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
