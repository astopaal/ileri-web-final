import React, { useState } from "react";
import * as XLSX from "xlsx/xlsx.mjs";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


const FileUploader = (props) => {
  const [file, setFile] = useState(); //dosyayı burada tutuyoruz
  const [reRender, setReRender] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files?.[0]);
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

        console.log(dataJson);

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
          setReRender(!reRender) 
        });
      };
      reader.readAsArrayBuffer(file);
      console.log(props.students);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".xls, .xlsx" onChange={handleFileChange} />
        <button type="submit">Upload</button>
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
