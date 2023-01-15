import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx/xlsx.mjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";

const FileUploader = (props) => {
  //dosyayı burada tutuyoruz
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [veriler, setVeriler] = useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event) => {
    props.setFile(event.target.files?.[0]);
  };

  const postStudent = async (student) => {
    try {
      await axios.post("http://localhost:8888/save-students", {
        s: student,
      });
      console.log(student);
    } catch (err) {
      console.log(err);
    }
  };

  const postStudents = () => {
    try {
      for (let i = 0; i <= props.students.length; i++) {
        let j = props.students[i];
        postStudent(j);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let _filename = props.file.name.split(".").pop().toLowerCase();
    if (props.file) {
      if (_filename == "xls" || _filename == "xlsx") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target?.result);

          const workbook = XLSX.read(data, {
            type: "array",
            cellDates: true,
            dateNF: "dd-mm-yyyy",
          });

          //sheet to json fonksiyonu, varsayılan olarak ilk satırdaki veriyi almaz
          //ilk satırda başlıkların bulunduğunu varsayar.
          // let dataJson = XLSX.utils.sheet_to_json(
          //   workbook.Sheets[workbook.SheetNames[0]]
          // );

          //ilk satırı da görmek için bunu kullanırsınız :

          // console.log(
          // XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
          //   header: 1,
          // })
          // );

          let dataJson = XLSX.utils.sheet_to_json(
            workbook.Sheets[workbook.SheetNames[0]],
            {
              header: 1,
            }
          );

          console.log(dataJson);
          props.excelData.push(dataJson);
          //öğrencileri props ile gelen array'e atıyor
          dataJson.map((item) => {
            props.students.push({
              studentNumber: item[1],
              name: item[2],
            });
          });

          props.setCopy(props.students);
          setVeriler(props.students);
        };
        reader.readAsArrayBuffer(props.file);
      } else {
        alert("Lütfen bir excel dosyası yükleyin!");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="bg-[#FFEBB7] p-2 flex items-center justify-center">
          <input className="" type="file" onChange={handleFileChange} />

          <button
            className="border-2 border-[#AD8E70] bg-[#FFEBB7] rounded w-20 h-12 ml-10 hover:bg-[#AD8E70] hover:text-black hover:border-[#FFEBB7] transition ease-linear duration-200"
            type="submit"
            onClick={() => {
              setClick(true), handleClickOpen();
            }}
          >
            Yükle
          </button>
        </div>
      </form>
      <span className="p-4 text-white">
        Öğrenci sayısı : {props.students.length}
      </span>
      {props.file && click === true && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Veritabanı Kayıt"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Öğrencileri veritabanına eklemek ister misiniz
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hayır</Button>
            <Button
              onClick={() => {
                handleClose();
                postStudents();
              }}
              autoFocus
            >
              Evet
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <div className="flex mt-10 p-4">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {veriler.map((row) => (
                <TableRow
                  key={row.studentNumber}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.studentNumber}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default FileUploader;
