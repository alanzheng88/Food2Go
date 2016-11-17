package models;
 
import java.util.*;
import javax.persistence.*;
 
import play.db.jpa.*;
 
@Entity
@Table(name = "AppUser")
public class User extends Model {
 
    public String firstName;
    public String lastName;
    public String email;
    public String password;
    public String role;
    
    public User(String firstName, String lastName, String email, String password, String role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    @Override
    public String toString() {
        return "first name: " + firstName
            + "\nlast name: " + lastName
            + "\nemail: " + email
            + "\npassword: " + password
            + "\nrole: " + role;
    }
 
}