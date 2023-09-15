// Back End Calls
// CRUD
import axios from "axios";
export const apiClient = {
  async read() {
    try {
      const response = await axios.get(process.env.REACT_APP_NOTES_URL);
      return response.data.notes; //[{},{},{}]
    } catch (err) {
      throw err;
    }
  },
  async insert(note) {
    // insert
    try {
      const response = await axios.post(
        process.env.REACT_APP_NOTES_ADD_URL,
        note
      );

        return response.data; //[{},{},{}]
    } catch (err) {
      console.log("Error in post", err);

      throw err;
    }
  },
  update() {},
  remove() {},
};
