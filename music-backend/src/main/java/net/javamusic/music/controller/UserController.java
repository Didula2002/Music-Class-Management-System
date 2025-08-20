// UserController.java
package net.javamusic.music.controller;

import net.javamusic.music.exception.UserNotFoundException;
import net.javamusic.music.entity.User;
import net.javamusic.music.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/get")
    public ResponseEntity<User> getUser(@RequestParam(name = "email") String email,
                                        @RequestParam(name = "password") String password) {
        try {
            User user = userService.getUser(email, password);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Void> registerNewUser(@Valid @RequestBody User user) {
        userService.addNewUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteUserByEmail(@RequestParam(name = "email") String email) {
        userService.deleteUserByEmail(email);
        return ResponseEntity.noContent().build();
    }
}
