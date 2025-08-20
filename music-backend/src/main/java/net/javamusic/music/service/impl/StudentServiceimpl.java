package net.javamusic.music.service.impl;

import lombok.AllArgsConstructor;
import net.javamusic.music.dto.StudentDto;
import net.javamusic.music.entity.Student;
import net.javamusic.music.exception.ResourceNotFoundException;
import net.javamusic.music.mapper.StudentMapper;
import net.javamusic.music.repository.StudentRepository;
import net.javamusic.music.service.StudentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class StudentServiceimpl implements StudentService {


    private StudentRepository studentRepository;
    @Override
    public StudentDto createStudent(StudentDto studentDto) {

        Student student = StudentMapper.mapToStudent(studentDto);
        Student savedStudent = studentRepository.save(student);

        return StudentMapper.mapToStudentDto(savedStudent);
    }

    @Override
    public StudentDto getStudentById(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student is not exists with given id : "+ studentId));

        return StudentMapper.mapToStudentDto(student);
    }

    @Override
    public List<StudentDto> getAllStudents() {
        List<Student> students = studentRepository.findAll();

        return students.stream().map((student) -> StudentMapper.mapToStudentDto(student))
                .collect(Collectors.toList());
    }

    @Override
    public StudentDto updateStudent(Long studentId, StudentDto updatedStudent) {
        Student student = studentRepository.findById(studentId).orElseThrow(() -> new ResourceNotFoundException("Student is not exists with given id : "+ studentId));
       student.setFistName(updatedStudent.getFistName());
       student.setLastName(updatedStudent.getLastName());
       student.setEmail(updatedStudent.getEmail());
       student.setPhoneNO(updatedStudent.getPhoneNO());
       student.setGrade(updatedStudent.getGrade());
       student.setPaymentStatus(updatedStudent.isPaymentStatus());

       Student updateStudentObj = studentRepository.save(student);
        return StudentMapper.mapToStudentDto(updateStudentObj);
    }

    @Override
    public void deleteStudent(Long studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(() -> new ResourceNotFoundException("Student is not exists with given id : "+ studentId));

        studentRepository.deleteById(studentId);
    }
}
