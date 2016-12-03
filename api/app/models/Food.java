package models;
 
import java.util.*;
import javax.persistence.*;
 
import play.db.jpa.*;
import play.data.validation.*;

@Entity
@Table(name="food")
public class Food extends AppModel {
    
    @Required
    public String name;
    
    @Required
    public String price;

    public String salePrice;

    @Required
    @Lob
    public String description;

    @Required
    @ManyToOne
    public Restaurant restaurant;
    
    public Food(String name, String price, String salePrice, String description) {
        this.name = name;
        this.price = price;
        this.salePrice = salePrice;
        this.description = description;
    }

    public static List<Food> findByIds(String foodIds) {
        List<Long> foodIdList = convertToLongList(foodIds.split(","));
        if (foodIdList == null) {
            System.out.println("food id list is null");
            return null;
        }
        try {
            Query q = createQuery("select f from Food f where f.id IN ?1");
            System.out.println("executing query for findWithIds");
            q.setParameter(1, foodIdList);
            return q.getResultList();
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static List<Food> findByRestaurantId(long restaurantId) {
        try {
            Query q = createQuery("select f from Food f JOIN f.restaurant as r where r.id = ?1");
            q.setParameter(1, restaurantId);
            return q.getResultList();
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return null;
        }

    }

    private static List<Long> convertToLongList(String[] arr) {
        List<Long> intList = new ArrayList<Long>();
        for (int i = 0; i < arr.length; i++) {
            try {
                intList.add(Long.valueOf(arr[i]));
            } catch (NumberFormatException e) {
                return null;
            }
        }
        return intList;
    }
}