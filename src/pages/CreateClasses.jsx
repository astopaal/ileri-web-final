import React, { useState } from "react";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
} from "@mui/material";
import FileUploader from "../components/FileUploader";

const CreateClasses = (props) => {
  const [students, setStudents] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value, capacity },
    } = event;
    props.setSelectedClass(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    console.log(props.selectedClass);
  };

  const handleAddClass = () => {
    let studentCount = props.students.length
    let selectedCapacity = 0;

    for (let i = 0; i < props.classes.length; i++) {
      for (let j = 0; j < props.selectedClass.length; j++) {
        let element = props.classes[i];
        if (String(props.selectedClass[j]) === String(element.label)) {
          selectedCapacity += element.kapasite;
        }
      }
    }

    studentCount === selectedCapacity && shuffle()
  };

  const shuffle = () => {
    
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <div className=" flex flex-col p-4 mt-20 ">
      <div className="bg-[#FFEBB7] flex flex-row items-center justify-center">
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="select-class"></InputLabel>
          <Select
            labelId="select-class"
            id="select-class-checkbox"
            multiple
            value={props.selectedClass}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {props.classes.map((c) => (
              <MenuItem key={c.label} value={c.label}>
                <Checkbox checked={props.selectedClass.indexOf(c.label) > -1} />
                <ListItemText
                  primary={"Sınıf : " + c.label + " Kapasite : " + c.kapasite}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <button
          id="btn-add-class"
          className="border-2 border-[#AD8E70] rounded w-20 h-12 ml-10 hover:bg-[#AD8E70] hover:text-black hover:border-[#AD8E70] transition ease-linear duration-200"
          onClick={() => {
            handleAddClass();
          }}
        >
          Karıştır
        </button>
      </div>
      <div className="p-5 bg-[#AD8E70] file-uploader-component mt-10">
        <FileUploader students={students} setStudents={setStudents} />
      </div>
    </div>
  );
};

export default CreateClasses;
