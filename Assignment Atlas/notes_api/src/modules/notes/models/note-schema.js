//import mongoose from '../../../shared/db/connection.js';
import mongoose, { SchemaTypes } from "mongoose";
import { AppConstants } from "../../../shared/utils/app-constants.js";
const schemaName = AppConstants.SCHEMA.NOTE_SCHEMA;
const Schema = mongoose.Schema; 
const NoteSchema = new Schema({
  id: { type: SchemaTypes.String, required: true },
  title: { type: SchemaTypes.String, required: true, unique: true },
  descr: { type: SchemaTypes.String },
  cdate: { type: SchemaTypes.Date },
  importance: { type: SchemaTypes.String },
  status: { type: SchemaTypes.String, default: "A" },
  creationDate: { type: SchemaTypes.Date, default: new Date() },
  //opt:{},
  //remarks:[]
});
const NotesModel = mongoose.model(schemaName, NoteSchema);
export default NotesModel;
