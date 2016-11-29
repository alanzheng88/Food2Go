package models;
 
import java.util.*;
import javax.persistence.*;
 
import play.db.jpa.*;
import play.data.validation.*;

@Entity
@Table(name = "AppOrder")
public class Order extends Model {
 
    @ManyToOne
    public Restaurant restaurant;
    
    @Required
    public String date;
    
    @Required
    public String totalCost;
    
    /*
        -1 = Order Cancelled
        0  = Order Created
        1 = Order Processing
        2 = Payment Processing
        3 = Delivery
        4 = Delivered
        5 = Pick Up Ready
        6 = Picked Up
    */
    @Required
    public int status;
    
    
    public Order(String date, String totalCost, String status) {
        this.date = date;
        this.totalCost = totalCost;
        this.status = Integer.parseInt(status);
    }

}