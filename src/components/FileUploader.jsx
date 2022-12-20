import React, { useState } from "react";
import * as XLSX from "xlsx/xlsx.mjs";

const FileUploader = () => {
  const [file, setFile] = useState(); //dosyayı burada tutuyoruz

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
        console.log(
          //sheet to json fonksiyonu, varsayılan olarak ilk satırdaki veriyi almaz
          //ilk satırda başlıkların bulunduğunu varsayar.
          XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
        );

        //ilk satırı da görmek için bunu kullanırsınız :
        
        // console.log(
        //   XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
        //     header: 1,
        //   })
        // );
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUploader;
