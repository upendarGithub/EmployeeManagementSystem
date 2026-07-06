package com.upendar.ems.service;

import java.util.List;

import com.upendar.ems.dto.EmployeeDTO;
import com.upendar.ems.entity.Employee;

public interface EmployeeService {

    EmployeeDTO saveEmployee(EmployeeDTO employeeDTO);

    List<EmployeeDTO> getAllEmployees();

    EmployeeDTO getEmployeeById(Long id);

    EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO);

    void deleteEmployee(Long id);

    List<Employee> searchEmployees(String name);
}