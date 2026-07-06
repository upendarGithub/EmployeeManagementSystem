package com.upendar.ems.service;

import java.util.stream.Collectors;

import com.upendar.ems.dto.EmployeeDTO;
import com.upendar.ems.mapper.EmployeeMapper;
import java.util.List;

import org.springframework.stereotype.Service;

import com.upendar.ems.entity.Employee;
import com.upendar.ems.exception.ResourceNotFoundException;
import com.upendar.ems.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public EmployeeDTO saveEmployee(EmployeeDTO employeeDTO) {

    Employee employee = EmployeeMapper.mapToEmployee(employeeDTO);

    Employee savedEmployee = employeeRepository.save(employee);

     return EmployeeMapper.mapToEmployeeDTO(savedEmployee);
  }

    @Override
public List<EmployeeDTO> getAllEmployees() {

    List<Employee> employees = employeeRepository.findAll();

    return employees.stream()
            .map(EmployeeMapper::mapToEmployeeDTO)
            .collect(Collectors.toList());
}

@Override
public EmployeeDTO getEmployeeById(Long id) {

    Employee employee = employeeRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Employee not found with id : " + id));

    return EmployeeMapper.mapToEmployeeDTO(employee);
}

    @Override
public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO) {

    Employee existingEmployee = employeeRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Employee not found with id : " + id));

    existingEmployee.setName(employeeDTO.getName());
    existingEmployee.setEmail(employeeDTO.getEmail());
    existingEmployee.setDepartment(employeeDTO.getDepartment());
    existingEmployee.setSalary(employeeDTO.getSalary());

    Employee updatedEmployee = employeeRepository.save(existingEmployee);

    return EmployeeMapper.mapToEmployeeDTO(updatedEmployee);
}

    @Override
    public void deleteEmployee(Long id) {

    Employee employee = employeeRepository.findById(id)
            .orElseThrow(() ->
                    new ResourceNotFoundException(
                            "Employee not found with id : " + id));

        employeeRepository.delete(employee);
    }

    @Override
    public List<Employee> searchEmployees(String name) {
        return employeeRepository.findByNameContainingIgnoreCase(name);
    }
}