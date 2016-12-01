package models;
 
import java.util.*;
import javax.persistence.*;
 
import play.db.jpa.*;
import play.data.validation.*;

public class AppModel extends Model {

    public static Query createQuery(String queryStr) {
        // throws IllegalArgumentException - if the query string is found to be invalid
        Query query = JPA.em().createQuery(queryStr);
        return query;
    }
}