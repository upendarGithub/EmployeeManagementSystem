import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { listEmployees, deleteEmployee } from "../services/EmployeeService";
import Swal from "sweetalert2";
const EmployeeList = () => {

    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllEmployees();
    }, []);

    function updateEmployee(id) {

    navigate(`/edit-employee/${id}`);

}
    function handleSearch(e){

        const value = e.target.value;

        setSearch(value);

    }

    function getAllEmployees() {

    console.log("Loading started");
    setLoading(true);

    listEmployees()
        .then((response) => {

            console.log("Response:", response.data);

            setEmployees(response.data);

        })
        .catch((error) => {

            console.error(error);

        })
        .finally(() => {

            console.log("Loading finished");

            setLoading(false);

        });

    }
    function removeEmployee(id) {

    Swal.fire({

        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",

        showCancelButton: true,

        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",

        confirmButtonText: "Yes, delete it!"

    }).then((result) => {

        if (result.isConfirmed) {

            deleteEmployee(id)
                .then(() => {

                    Swal.fire({
                        title: "Deleted!",
                        text: "Employee deleted successfully.",
                        icon: "success"
                    });

                    getAllEmployees();

                })
                .catch(error => {

                    console.error(error);

                });

        }

    });

}
const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(search.toLowerCase())
);

    return (
        <div className="container mt-4">

           <div className="d-flex justify-content-between align-items-center mb-3">

    <h2>Employees</h2>

    <button
        className="btn btn-primary"
        onClick={() => navigate("/add-employee")}
    >

        + Add Employee

    </button>

</div>
            <div className="mb-3">
           <div className="input-group mb-3">

    <span className="input-group-text">

        <i className="bi bi-search"></i>

    </span>

    <input
        type="text"
        className="form-control"
        placeholder="Search employee..."
        value={search}
        onChange={handleSearch}
    />

</div>

            </div>
            <div className="card shadow">
                

    <div className="card-body">
        {
    loading &&

    <div className="text-center mb-3">

        <div className="spinner-border text-primary"></div>

        <p className="mt-2">Loading Employees...</p>

    </div>
    }


        {
        !loading && (
       <table className="table table-bordered table-striped">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        filteredEmployees.map((employee, index)=> (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.department}</td>
                                <td>{employee.salary}</td>
                                <td>

                                <button
                                    className="btn btn-info btn-sm me-2"
                                    onClick={() => updateEmployee(employee.id)}
                                >
                                    <i className="bi bi-pencil-square"></i>
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removeEmployee(employee.id)}
                                >
                                    <i className="bi bi-trash-fill"></i>
                                    Delete
                                </button>

                                </td>
                            </tr>
                        ))
                    }

                </tbody>

            </table>
            )
            }


    </div>

</div>
        </div>
    );
}

export default EmployeeList;