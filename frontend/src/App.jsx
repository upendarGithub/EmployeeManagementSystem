import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";

function App() {

    return (

        <>

            <Navbar />

            <Routes>

                <Route path="/" element={<EmployeeList />} />

                <Route path="/add-employee" element={<EmployeeForm />} />

                <Route path="/edit-employee/:id" element={<EmployeeForm />} />

            </Routes>

            <Footer />

        </>

    )

}

export default App;