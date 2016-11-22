package models;
 
import java.util.*;
import javax.persistence.*;
 
import play.db.jpa.*;
import play.data.validation.*;

@Entity
@Table(name = "Restaurant")
public class Restaurant extends Model {
 
    @Required
    public String name;
    
    @Required
    public String phoneNumber;
    
    @Required
	@Email
	public String email;
    
    @Required
    @Lob
    public String address;
    
    @Required
    @Lob
    public String description;
	
    
    public Restaurant(String name, String email, String phoneNumber, String address, String description) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.description = description;
    }

    public void update(String name, String phoneNumber, String email, String address, String description){
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.description = description;
        this.save();
    } 
}