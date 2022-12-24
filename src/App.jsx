import React, { useState } from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import CreateClasses from "./pages/CreateClasses";

const App = () => {
  
  const classes = [
    { label: "101", kapasite: 38 },
    { label: "102", kapasite: 40 },
    { label: "103", kapasite: 34 },
    { label: "104", kapasite: 30 },
    { label: "105", kapasite: 40 },
    { label: "106", kapasite: 24 },
    { label: "107", kapasite: 24 },
    { label: "108", kapasite: 30 },
    { label: "109", kapasite: 34 },
    { label: "201", kapasite: 38 },
    { label: "202", kapasite: 40 },
    { label: "203", kapasite: 34 },
    { label: "204", kapasite: 20 },
    { label: "205", kapasite: 20 },
    { label: "206", kapasite: 50 },
    { label: "207", kapasite: 44 },
    { label: "208", kapasite: 22 },
    { label: "209", kapasite: 20 },
  ];

  const [selectedClass, setSelectedClass] = useState([]);
  

  return (
    <div className="bg-[#FF6E31] min-w-screen min-h-screen">
      <div className="flex flex-col justify-center items-center">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <CreateClasses
                  classes={classes}
                  setSelectedClass={setSelectedClass}
                  selectedClass = {selectedClass}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
