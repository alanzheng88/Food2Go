package models;
 
import java.util.*;
import javax.persistence.*;
 
import play.db.jpa.*;

import play.data.validation.*;

import play.libs.Crypto;
 
@Entity
@Table(name = "AppUser", 
       uniqueConstraints={@UniqueConstraint(columnNames = {"email"})})
public class User extends Model {
 
    @Required
    public String firstName;

    @Required
    public String lastName;

    @Required
    @MaxSize(value=254, message = "email.maxsize")
    @Email
    @Column(name = "email")
    public String email;

    @Required
    @MinSize(6)
    public String password;

    @Required
    @Match("(restaurantOwner)|(customer)")
    public String role;

    // this is only used by unit tests for testing
    public User(String firstName, String lastName, 
                String email, String password, String role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public void encryptPassword() {
        if (password == null) return;
        String passwordHash = Crypto.passwordHash(password);
        String passwordAesEncrypted = Crypto.encryptAES(passwordHash);
        password = passwordAesEncrypted;
    }

    public String decryptPassword() {
        if (password == null) return "";
        return Crypto.decryptAES(password);
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