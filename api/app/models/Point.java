package models;
 
import java.util.*;
import javax.persistence.*;
 
import play.db.jpa.*;

import play.data.validation.*;
 
@Entity
public class Point extends Model {
 
    @Required
    public int points;

    public Point(int points) 
    {
        this.points = points;
    }
 
}