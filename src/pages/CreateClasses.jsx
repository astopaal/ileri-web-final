import React, { useState } from "react";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  appBarClasses,
  Box,
  Button,
  Typography,
  Modal,
} from "@mui/material";

import FileUploader from "../components/FileUploader";
import axios from "axios";
import { shouldShowFallbackImage } from "@chakra-ui/react";

const CreateClasses = (props) => {
  const [file, setFile] = useState();
  const [students, setStudents] = useState([]);
  const [copy, setCopy] = useState([]);
  const [capacities, setCapacities] = useState([]);
  const [classData, setClassData] = useState([]);
  const [open, setOpen] = useState(false);
  const [clickedButton, setClickedButton] = useState("Initial Sınıf Adı");
  const [excelData, setExcelData] = useState([]);
  const [karisik, setKarisik] = useState(false);
  const [studentDataById, setStudentDataById] = useState([]);
  const [studentOpen, setStudentOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleCloseDocument = () => setStudentOpen(false);

  const dialogStyle = {
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    padding: 4,
    maxHeight: 500,
    overflow: "scroll",
  };
  const dialogStyle__ = {
    width: 450,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    padding: 4,
    maxHeight: 500,
  };

  const handleChange = (event) => {
    setKarisik(true);
    const {
      target: { value, capacity },
    } = event;
    props.setSelectedClass(
      // On autofill we get a stringified value
      typeof value === "string" ? value.split(",") : value
    );

    console.log(props.selectedClass);
  };

  const shuffle = (array) => {
    //fisher-yates / durstenfeld algoritması, parametre aldığı array'i karıştırır.
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  const handleAddClass = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    let studentCount = copy.length;
    let selectedCapacity = 0;

    for (let i = 0; i < props.classes.length; i++) {
      for (let j = 0; j < props.selectedClass.length; j++) {
        let element = props.classes[i];
        if (String(props.selectedClass[j]) === String(element.label)) {
          capacities.push(element.kapasite);
          selectedCapacity += element.kapasite;
        }
      }
    }

    studentCount <= selectedCapacity
      ? (shuffle(copy), addClassToStudentData())
      : alert("Seçilen sınıflar yeterli kapasitede değil.");
  };

  const showClassroomData = async (cRoom) => {
    try {
      const response = await axios
        .get("http://localhost:8888/class-data/" + cRoom + "")
        .then((response) => {
          setClassData(response.data);
          console.log(response.data);
        });
    } catch (err) {
      console.log(err.message);
    }
    setOpen(true);
  };

  const addClassToStudentData = () => {
    for (let i = 0; i < capacities.length; i++) {
      console.log("i : ", i);
      console.log("secilen sınıfların sayısı: ", props.selectedClass.length);
      console.log("kapasiteler : ", capacities);
      for (let j = 0; j < capacities[i]; j++) {
        console.log("j: ", j);
        let student = copy[j];

        if (student != null) {
          try {
            axios.post("http://localhost:8888/update-class", {
              s: student,
              c: props.selectedClass[i],
            });
            console.log(student);
          } catch (err) {
            console.log(err);
          }
        } else {
          break;
        }
      }

      copy.splice(0, capacities[i]);
    }
  };

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

  const createDocument = async () => {
    let ogrNo = document.getElementById("ogr-no").value;

    try {
      const response = await axios
        .get("http://localhost:8888/get-student-data/" + ogrNo + "")
        .then((response) => {
          studentDataById?.splice(0, studentDataById.length);
          studentDataById.push(response.data);
          console.log("ogr data : ", response.data);
        });
    } catch (err) {
      console.log(err.message);
    }
    console.log("usestate data : ", studentDataById);
    setStudentOpen(true);
  };

  return (
    <div className=" flex flex-col p-4 mt-20 min-w-[900px]">
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
      {
        <>
          <div className="bg-[#AD8E70] p-4 m-4 items-center justify-center">
            <p className=""> Sınıfları Görmek İçin Tıklayın :</p>
            {karisik && (
              <div className=" m-4">
                <input
                  className="bg-[#AD8E70] border rounded p-2 mr-4"
                  type="text"
                  id="ogr-no"
                />{" "}
                <button onClick={createDocument} className="border rounded p-2">
                  kimlik kartı oluştur
                </button>
              </div>
            )}
            <div className="flex flex-row">
              {props.selectedClass.map((c, index) => (
                <div key={index}>
                  <button
                    onClick={() => {
                      showClassroomData(c);
                      setClickedButton(c);
                    }}
                    className="border border-white rounded p-2 mr-10"
                  >
                    {c} için sınıf listesini göster
                  </button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="p-4 flex justify-center items-center"
                  >
                    <Box sx={dialogStyle}>
                      <table
                        id="excel-tablo"
                        className=" p-2 flex flex-col items-center justify-center"
                      >
                        <thead className="flex flex-col items-center justify-center ">
                          <tr className="">
                            <td className="">
                              Kırklareli Üniversitesi <br />
                              {excelData[0][0][6]} {excelData[0][2][6]}
                              <br />
                              {excelData[0][3][6].toLocaleDateString("tr-TR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              })}{" "}
                              -{" "}
                              {excelData[0][4][6].toLocaleTimeString("tr-TR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                              <br />
                              {excelData[0][1][6]} <br />
                              {clickedButton} Numaralı Sınıf
                              <br />
                            </td>
                          </tr>
                          <tr className="text-center">
                            <td className="border-2 box-border border-black w-4">
                              SN
                            </td>
                            <td className="border-2 box-border border-black w-48">
                              Öğrenci No
                            </td>
                            <td className="border-2 box-border border-black w-96">
                              Adı Soyadı
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          {classData.map((item, index) => (
                            <tr className="border-2 border-black" key={index}>
                              <td className="border-2 text-center w-4 border-black">
                                {index + 1}
                              </td>
                              <td className="border-2 text-center w-48 border-black">
                                {item.student_number}
                              </td>
                              <td className="border-2 text-center w-96 border-black">
                                {item.name}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <button
                        className="p-2 float-right text-black border-2 border-blue-700 bg-blue-700 rounded hover:bg-blue-200 hover:text-gray-900 transition duration-500"
                        onClick={() => {
                          const table = document.getElementById("excel-tablo");
                          const wb = XLSX.utils.table_to_book(table);

                          // excel olarak indir
                          XLSX.writeFile(wb, "excel-tablosu.xlsx");
                        }}
                      >
                        {" "}
                        Excel olarak al
                      </button>
                    </Box>
                  </Modal>
                  <Modal
                    open={studentOpen}
                    onClose={handleCloseDocument}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="p-4 flex justify-center items-center"
                  >
                    <Box sx={dialogStyle__}>
                      <div className="flex">
                        <img
                          className="w-[35%]"
                          src="https://upload.wikimedia.org/wikipedia/tr/e/e7/K%C4%B1rklareli_%C3%9Cniversitesi_logosu.jpg"
                          alt="avatar"
                        />
                        {studentDataById[0] != null && (
                          <div className="flex flex-col">
                            <p className="border-2 border-black w-60 p-1 ml-4">
                              Ad :{studentDataById[0][0]?.name}
                            </p>

                            <p className="border-2 border-black w-60 p-1 ml-4">
                              Öğrenci Numarası :
                              {studentDataById[0][0]?.student_number}
                            </p>
                            <p className="border-2 border-black w-60 p-1 ml-4">
                              Sınava Gireceği Sınıf :
                              {studentDataById[0][0]?.sinav_sinifi}
                            </p>
                          </div>
                        )}
                      </div>
                    </Box>
                  </Modal>
                </div>
              ))}
            </div>
          </div>
        </>
      }
      <div className="p-3 bg-[#AD8E70] file-uploader-component">
        <FileUploader
          excelData={excelData}
          setExcelData={setExcelData}
          file={file}
          copy={copy}
          students={students}
          setFile={setFile}
          setCopy={setCopy}
          setStudents={setStudents}
        />
      </div>
    </div>
  );
};

export default CreateClasses;
