import React, { useState } from "react";
import * as XLSX from "xlsx/xlsx.mjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import axios from "axios";

const FileUploader = (props) => {
  const [file, setFile] = useState(); //dosyayı burada tutuyoruz
  const [reRender, setReRender] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files?.[0]);
  };

  const postStudents = async () => {
    try {
      await axios.post("http://localhost:8888/save-students", {
        s: props.students,
      });
      console.log(props.students);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result);
        const workbook = XLSX.read(data, { type: "array" });

        //sheet to json fonksiyonu, varsayılan olarak ilk satırdaki veriyi almaz
        //ilk satırda başlıkların bulunduğunu varsayar.
        let dataJson = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]]
        );

        //ilk satırı da görmek için bunu kullanırsınız :

        // console.log(
        //   XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
        //     header: 1,
        //   })
        // );

        //öğrencileri props ile gelen array'e atıyor
        dataJson.map((item) => {
          props.students.push({
            id: item["Öğrenci No"],
            name: item[" Adı Soyadı"],
          });
          setReRender(!reRender);
        });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="bg-[#FFEBB7] p-2 flex items-center justify-center">
          <input
            className=""
            type="file"
            accept=".xls, .xlsx"
            onChange={handleFileChange}
          />
          <button
            className="border-2 border-[#AD8E70] bg-[#FFEBB7] rounded w-20 h-12 ml-10 hover:bg-[#AD8E70] hover:text-black hover:border-[#FFEBB7] transition ease-linear duration-200"
            type="submit"
            onClick={postStudents}
          >
            Yükle
          </button>
        </div>
      </form>
      <div className="flex mt-10 p-4">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Öğrenci No</TableCell>
                <TableCell align="right">Adı Soyadı</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.students.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
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
