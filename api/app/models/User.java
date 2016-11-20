package models;
 
import java.util.*;
import javax.persistence.*;
 
import play.db.jpa.*;

import play.data.validation.*;

import play.libs.Crypto;
 
@Entity
@Table(name = "AppUser")
public class User extends Model {
 
    @Required
    public String firstName;

    @Required
    public String lastName;

    @Required
    @MaxSize(value=254, message = "email.maxsize")
    @Email
    public String email;

    @Required
    @MinSize(6)
    public String password;

    @Required
    @Match("(restaurantOwner)|(customer)")
    public String role;

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