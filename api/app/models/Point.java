package models;
 
import java.util.*;
import javax.persistence.*;
 
import play.db.jpa.*;

import play.data.validation.*;
 
@Entity
public class Point extends Model {
 
    @Required
	public long userID

    @Required
    public int points

    public Point(long userID, int points) 
	{
        this.userID = userID;
        this.points = points;
    }
 
}