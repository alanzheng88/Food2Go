package models;
 
import java.util.*;
import javax.persistence.*;
 
import play.db.jpa.*;
import play.data.validation.*;


@Entity
public class Picture extends Model {
    public Blob image;
    public byte[] file;
	public String fileName;
	public String contentType;
	
}