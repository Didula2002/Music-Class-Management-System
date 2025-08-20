package net.javamusic.music.mapper;

import net.javamusic.music.dto.StudentDto;
import net.javamusic.music.entity.Student;

public class StudentMapper {
    public static StudentDto mapToStudentDto(Student student){
        return new StudentDto(
                student.getId(),
                student.getFistName(),
                student.getLastName(),
                student.getEmail(),
                student.getPhoneNO(),
                student.getGrade(),
                student.isPaymentStatus()

        );

    }
    public static Student mapToStudent(StudentDto studentDto){
        return new Student(
                studentDto.getId(),
                studentDto.getFistName(),
                studentDto.getLastName(),
                studentDto.getEmail(),
                studentDto.getPhoneNO(),
                studentDto.getGrade(),
                studentDto.isPaymentStatus()
        );
    }
}
