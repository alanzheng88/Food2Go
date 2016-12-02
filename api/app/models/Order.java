package models;
 
import java.util.*;
import javax.persistence.*;

import play.db.jpa.*;
import play.data.validation.*;

import java.util.Date;

@Entity
@Table(name = "app_order")
public class Order extends AppModel {
 
    @Required
    @ManyToOne
    public Restaurant restaurant;

    @Required
    public String destinationAddress;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "dateCreated", nullable = false, updatable=false)
    public Date dateCreated;
    
    @Required
    public String totalCost;
    
    /*
       -1 = Order Cancelled
        0 = Order Created
        1 = Order Processing
        2 = Payment Processing
        3 = Delivery
        4 = Delivered
        5 = Pick Up Ready
        6 = Picked Up
    */
    @Required
    public int status;

    @ManyToMany(cascade=CascadeType.PERSIST)
    public List<Food> foods;

    @ManyToOne
    public User user;
    
    
    public Order(Restaurant restaurant, String destinationAddress, 
                 String totalCost, int status, List<Food> foods) {
        this.restaurant = restaurant;
        this.destinationAddress = destinationAddress;
        this.totalCost = totalCost;
        this.status = status;
        this.foods = foods;
    }

    @PrePersist
    public void onCreate() {
        dateCreated = new Date();
    }

    public static List<Order> findOrderWith(User user) {
        try {
            Query q = createQuery("select o from Order o join o.user as t where t.id = ?1");
            q.setParameter(1, user.id);
            return q.getResultList();
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

}