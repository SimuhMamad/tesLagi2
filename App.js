import React from "react";
// TODO: answer here
import { Route, Routes} from 'react-router-dom'
import Home from "./Routes/Home";
import Student from "./Routes/Student";
import NotFound from "./Routes/NotFound";
import AddStudent from "./Routes/AddStudent";
import EditStudent from "./Routes/EditStudent";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student" element={<Student />} />
            <Route path="/student/:id" element={<EditStudent />} />
            <Route path="/add" element={<AddStudent />} />
            <Route path="*" element={<NotFound />} />
        </Routes>// TODO: replace this
    );
};

export default App;
