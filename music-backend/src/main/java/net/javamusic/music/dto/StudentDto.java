package net.javamusic.music.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentDto {
    private Long id;
    private String fistName;
    private String lastName;
    private String email;
    private String phoneNO;
    private String grade;
    private boolean paymentStatus;

}
