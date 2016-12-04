package models;
 
import java.util.*;
import javax.persistence.*;
 
import play.db.jpa.*;

import play.data.validation.*;

import play.libs.Crypto;
 
@Entity
public class Picture extends Model {
    public Blob image;  
	
    @ManyToOne
    public User imageOwner;
}