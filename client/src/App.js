import { Routes, Route,  Navigate } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
//import { BrowserRouter as Router, Route } from "react-router-dom";

import Signup from "./components/Signup"
import Login from "./components/Login"
import CarsList from "./components/Cars/cars-list"
import CreateCar from "./components/Cars/create-car"
import EditCar from "./components/Cars/edit-car";



function App() {
    const user = localStorage.getItem("token")
    return (
        <Routes>
            {user && <Route path="/" exact element={<CarsList />} />}
            {user && <Route path="/create" exact element={<CreateCar />} />}
            {user && <Route path="/edit/:id" element={<EditCar />} />}

            <Route path="/signup" exact element={<Signup />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/" element={<Navigate replace to="/login" />} />
            
        </Routes>
    );
}

export default App;




