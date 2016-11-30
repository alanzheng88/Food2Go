package models;
 
import java.util.*;
import javax.persistence.*;
 
import play.db.jpa.*;
import play.data.validation.*;

@Entity
@Table(name = "restaurant")
public class Restaurant extends AppModel {
 
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

    @ManyToOne
    public User restaurantOwner;
	
    
    public Restaurant(String name, String phoneNumber, String email, String address, String description) {
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
    } 
}