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

public Picture(Blob image, byte[] file, String fileName, String contentType) {
        this.image = image;
        this.file = file;
        this.fileName = fileName;
        this.contentType = contentType;
    }	
}