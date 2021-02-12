import React ,{ useState }from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import Zoom from "@material-ui/core/Zoom";




function Note(props) {

  const [isExpanded, setExpanded] = useState(true);
  const [isExpanded_EditIcon, zoom_isExpanded_EditIcon] = useState(true);

  function handleClick() {
    props.onDelete(props.id);
  }
  function editNote(){
    props.onEdite(props.id);
  }
  function zoom_effect(){
    setExpanded(false);
    //console.log(isExpanded);
    setTimeout(function(){setExpanded(true);}, 60);
    //console.log(isExpanded);
  }
  function zoom_effect_EditIcon(){
    zoom_isExpanded_EditIcon(false);
    //console.log(isExpanded);
    setTimeout(function(){zoom_isExpanded_EditIcon(true);}, 60);
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
      <Zoom in={isExpanded_EditIcon}>
      <button onMouseEnter={zoom_effect_EditIcon} onClick={editNote}>
        <EditIcon />
      </button>
      </Zoom>
    </div>
  );
}

export default Note;
