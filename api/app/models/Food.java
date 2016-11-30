package models;
 
import java.util.*;
import javax.persistence.*;
 
import play.db.jpa.*;
import play.data.validation.*;

@Entity
@Table(name="food")
public class Food extends Model {
    
    @Required
    public String name;
    
    @Required
    public String price;

    public String salePrice;

    @Required
    @Lob
    public String description;

    @ManyToMany
    public List<Order> orders = new ArrayList<Order>();
    
    public Food(String name, String price, String salePrice, String description) {
        this.name = name;
        this.price = price;
        this.salePrice = salePrice;
        this.description = description;
    }

}