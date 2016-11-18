package models;
 
import java.util.*;
import javax.persistence.*;
 
import play.db.jpa.*;
import play.data.validation.*;

@Entity
public class Restaurant extends Model {
 
    @Required
    public String name;
    @Required
    public String owner;
    @Required
    public String phoneNumber;
	
    @Lob
    public String address;
    
    public Restaurant(String name, String phoneNumber, String address) {
        this.name = name;
        this.owner = owner;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
    public void updateRestaurant(String name, String phoneNumber, String address){
        this.name = name;
        this.owner = owner;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.save();
    } 
}