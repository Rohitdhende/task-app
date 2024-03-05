
export interface NotesState {
    notes: string[];
  }

  export interface DateState {
    date: string;
  }
  export interface StrikeState {
    strikeState: string[];
  }
  
  const initialNoteState = {
    notes: [],
  };

  const initialDateState ={
    date:''
  }
  const initialStrikeState = {
    strikeState: [],
  };
  interface AddNote {
    type: "ADD_NOTE";
    payload: string;
  }

  interface ResetNote {
    type: "RESET_NOTE";
  }
  
  interface DeleteNote {
    type: "DELETE_NOTE";
    payload: string;
  }
  interface UpdateNote {
    type: "UPDATE_NOTE";
    payload: {
      selectedNote: string;
      updatedNote: string;
    };
  }

  interface setDate {
    type:"SET_DATE";
    payload:string
  }
  
  interface StrikeNote {
    type: "STRIKE_NOTE";
    payload: string;
  }
  
  type Actions = AddNote | DeleteNote | UpdateNote | ResetNote;
  
  export const noteReducers = (
    notes: NotesState = initialNoteState,
    action: Actions
  ) => {
    switch (action.type) {
      case "ADD_NOTE": {
        return { ...notes, notes: [...notes.notes, action.payload] };
      }
      case "DELETE_NOTE": {
        let newArray = notes.notes.slice();
        let noteIndex = newArray.indexOf(action.payload);
        if (noteIndex !== -1) {
          newArray.splice(noteIndex, 1);
        }
  
        return { ...notes, notes: newArray };
      }
      case "UPDATE_NOTE": {
        let newArray = notes.notes.slice();
        let noteIndex = newArray.indexOf(action.payload.selectedNote);
  
        if (noteIndex !== -1) {
          newArray[noteIndex] = action.payload.updatedNote;
        }
  
        return { ...notes, notes: newArray };
      }
      case "RESET_NOTE" :{
        return {notes:[]}
      }
      default:
        return notes;
    }
  };
  

  export const dateReducer = (date:DateState=initialDateState,action:setDate)=>{
    switch (action.type) {
     
      case "SET_DATE" :{
        return {date:date}
      }
      default:
        return ;
    }
  }
  export const strikeReducer = (
    state: StrikeState = initialStrikeState,
    action: StrikeNote
  ) => {
    switch (action.type) {
      case "STRIKE_NOTE": {
        return { ...state, notes: [...state.strikeState, action.payload] };
      }
      default:
        return state;
    }
  };
  