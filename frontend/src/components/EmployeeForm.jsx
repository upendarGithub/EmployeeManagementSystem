import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee, getEmployee, updateEmployee } from "../services/EmployeeService";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const EmployeeForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);

const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    salary: ""
});

function handleChange(e) {

    const { name, value } = e.target;

    setEmployee({
        ...employee,
        [name]: value
    });

}
function saveEmployee(e) {

    e.preventDefault();

    if (id) {

        updateEmployee(id, employee)
    .then((response) => {

        console.log(response.data);

        Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Employee Updated Successfully!",
            timer: 1500,
            showConfirmButton: false
        }).then(() => {

            navigate("/");

        });

    })

    } else {

        createEmployee(employee)
    .then((response) => {

        console.log(response.data);

        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Employee Saved Successfully!",
            timer: 1500,
            showConfirmButton: false
        }).then(() => {

            navigate("/");

        });

    })
    }

}

useEffect(() => {

    if (id) {

        getEmployee(id)
            .then((response) => {

                setEmployee(response.data);

            })
            .catch(error => {

                console.error(error);

            });

    }

}, [id]);

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-header">

                   <h3>{id ? "Update Employee" : "Add Employee"}</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={saveEmployee}>

                        <div className="mb-3">

                            <label>Name</label>

                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={employee.name}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Email</label>

                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={employee.email}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Department</label>

                            <input
                                type="text"
                                className="form-control"
                                name="department"
                                value={employee.department}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="mb-3">

                            <label>Salary</label>

                            <input
                                type="number"
                                className="form-control"
                                name="salary"
                                value={employee.salary}
                                onChange={handleChange}
                            />

                        </div>

                        <button type="submit" className="btn btn-success">

                            Save Employee

                        </button>

                    </form>

                </div>

            </div>

        </div>

    )

}


export default EmployeeForm;