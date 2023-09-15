import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import SpatialAudioOffIcon from "@mui/icons-material/SpatialAudioOff";
import IconButton from "@mui/material/IconButton";
import DescriptionIcon from "@mui/icons-material/Description";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import { noteOperations } from "../services/note-operations";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MuiColorInput } from "mui-color-input";
import { addNote, addNoteToDatabase, insertNotes } from "../redux/note-slice";
import { Note } from "../models/note";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import "./Add.css";
import { FormDatePicker } from "../../../shared/components/FormDatePicker";
export const Add = (props) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const id = useRef();
  const title = useRef();
  const descr = useRef();
  const [dateValue, setDateValue] = useState(null);
  const [colorValue, setColorValue] = useState("#ffffff");
  //const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);
  const onSubmit = (data) => {
    console.log("Data is ", data);
    const noteObject = new Note(
      data.id,
      data.title,
      data.descr,
      data.cdate,
      data.importance
    );
    // dispatch(addNote(JSON.stringify(noteObject)));
    dispatch(insertNotes(noteObject));

  };
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  const takeNote = () => {
    console.log("Add Note is Called...");
    const idValue = id.current.value;
    const titleValue = title.current.value;
    const descValue = descr.current.value;
    // console.log('Date ',dateValue);
    const date = dateValue ? dayjs(dateValue).format("MM/DD/YYYY") : "";
    console.log("Now Date is ", date);
    console.log("Color ", colorValue);
    const noteObject = new Note(
      idValue,
      titleValue,
      descValue,
      date,
      colorValue
    );
    dispatch(addNote(noteObject));
    setOpen(true);
    //setMessage('Record Added...');
    // setTimeout(()=>{
    //   setMessage('');
    // },2000);
    // console.log('Id ',idValue);
    // console.log('Title ', titleValue);
    // console.log('Descr ', descValue);
    // Put the data in an object (Object Literal)
    //const noteObject = {'id':idValue, 'title':titleValue,
    //'descr':descValue};
    //const noteObject = noteOperations.addNote(idValue, titleValue, descValue, '','')
    //noteOperations.addNote(idValue, titleValue, descValue, date,colorValue)
    // props.fn(); // Call collectNoteData
  };

  return (
    <>
      <Box
        sx={{
          margin: 5,
          flexDirection: "column",
          display: "flex",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Note Added"
              action={action}
            />
            {/* <Typography>
          {message}
        </Typography> */}
            <TextField
              id="note-id"
              {...register("id")}
              //inputRef = {id}
              label="Id"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <TextField
              id="note-title"
              label="Title"
              // inputRef={title}
              {...register("title", {
                required: true,
                minLength: 3,
                pattern: /^[a-z]{3,10}/,
              })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SpatialAudioOffIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            {errors.title && errors.title.type === "required" && (
              <p className="errorMsg">Title is Required</p>
            )}
            {errors.title && errors.title.type === "minLength" && (
              <p className="errorMsg">Title Min Length is 3</p>
            )}
            <TextField
              //inputRef = {descr}
              {...register("descr", {
                validate: {
                  checkLength: (value) => value.length >= 6,
                },
              })}
              id="note-desc"
              label="Description"
              multiline
              maxRows={4}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SpatialAudioOffIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            {errors.descr?.type === "checkLength" && (
              <p>Min Length for Descr is 6</p>
            )}
            <FormDatePicker
              name="cdate"
              {...register("cdate")}
              control={control}
            />

            <MuiColorInput
              {...register("importance")}
              value={colorValue}
              onChange={(selectedColor) => setColorValue(selectedColor)}
            />
            {/* <input type='date'/>
      <input type='color'/> */}
            <Button type="submit" variant="contained" color="warning">
              Add Note
            </Button>
            {/* <DatePicker value={value} 
       onChange={(selectedDate) => setValue(selectedDate)} /> */}
          </FormControl>
        </form>
      </Box>
    </>
  );
};
