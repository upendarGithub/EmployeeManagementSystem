package com.upendar.ems.mapper;

import com.upendar.ems.dto.EmployeeDTO;
import com.upendar.ems.entity.Employee;

public class EmployeeMapper {

    // DTO --> Entity
    public static Employee mapToEmployee(EmployeeDTO employeeDTO) {

        Employee employee = new Employee();

        employee.setId(employeeDTO.getId());
        employee.setName(employeeDTO.getName());
        employee.setEmail(employeeDTO.getEmail());
        employee.setDepartment(employeeDTO.getDepartment());
        employee.setSalary(employeeDTO.getSalary());

        return employee;
    }

    // Entity --> DTO
    public static EmployeeDTO mapToEmployeeDTO(Employee employee) {

        EmployeeDTO employeeDTO = new EmployeeDTO();

        employeeDTO.setId(employee.getId());
        employeeDTO.setName(employee.getName());
        employeeDTO.setEmail(employee.getEmail());
        employeeDTO.setDepartment(employee.getDepartment());
        employeeDTO.setSalary(employee.getSalary());

        return employeeDTO;
    }
}