import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../../shared/services/api-client";

export const fetchNotes = createAsyncThunk("notes/fetch", async () => {
  try {
    const response = await apiClient.read(); // HTTP Call
    console.log("response is ", response);
    return response;
  } catch (err) {
    console.log("Err is ::: ", err);
    throw err;
  }
});

export const insertNotes = createAsyncThunk(
  "notes/insertNotes",
  async (note) => {
    console.log("THe extra is callsed", note);
    try {
      const response = await apiClient.insert(note);
      return response;
    } catch (err) {
      console.log("Err is ::: ", err);
      throw err;
    }
  }
);

const noteSlice = createSlice({
  name: "noteslice",
  initialState: {
    notes: [],
    total: 0,
    "search-result": [],
    isLoading: false,
    err: null,
  },
  reducers: {
    // CRUD Operations
    // Sync Operations
    // action - coming from the component
    // state - update the centeralized store.
    addNote(state, action) {
      const noteObject = action.payload;
      console.log("Add Note Reducer Operation Called.... ", action.payload);
      state.notes.push(noteObject);
    },
    getTotalRecords(state, action) {
      state.total = state.notes.length;
    },
    removeNote(state, action) {},
    searchNote(state, action) {
      const searchObj = action.payload;
      console.log("Search Obj :::: ", searchObj);
      //state['search-result'] = state.notes.filter(note=>note.title.includes(searchObj.search));
      state["search-result"] = state.notes.filter(
        (note) => note.id === searchObj.search
      );
    },
    sortNote(state, action) {
      const sortObject = action.payload;
      const key = sortObject.sortBy;
      state.notes.sort((first, second) => {
        if (key === "id") {
          return first[key] - second[key];
        } else {
          return first[key].localeCompare(second[key]);
        }
      });
    },
  },
  // Async
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state, action) => {
        state.isLoading = true;

        console.log("Pending.... ", action.payload);
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        console.log("FullFilled.... ", action.payload);
        state.isLoading = false;
        state.notes = action.payload; // Array of Objects
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        console.log("Rejected .... ", action.payload);
        state.isLoading = false;
        state.notes = [];
        state.err = action.payload;
      })
      .addCase(insertNotes.fulfilled, (state, action) => {
        const updatedNote = action.payload;
        state.isLoading = false;
        state.err = null;
      })
      .addCase(insertNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(insertNotes.pending, (state) => {
        state.isLoading = true;
        state.err = null;
      });
  },
});
export const {
  addNote,
  removeNote,
  getNote,
  getTotalRecords,
  searchNote,
  sortNote,
} = noteSlice.actions; // Component
export default noteSlice.reducer;
