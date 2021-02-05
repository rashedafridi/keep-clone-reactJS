import React ,{ useState }from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Zoom from "@material-ui/core/Zoom";




function Note(props) {

  const [isExpanded, setExpanded] = useState(true);

  function handleClick() {
    props.onDelete(props.id);
  }
  function zoom_effect(){
    setExpanded(false);
    //console.log(isExpanded);
    setTimeout(function(){setExpanded(true);}, 60);
    //console.log(isExpanded);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <Zoom in={isExpanded}>
      <button onMouseEnter={zoom_effect} onClick={handleClick}>
        <DeleteIcon />
      </button>
      </Zoom>
    </div>
  );
}

export default Note;
