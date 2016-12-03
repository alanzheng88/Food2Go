import play.*;
import play.jobs.*;
import play.test.*;
 
import models.*;
 
@OnApplicationStart
public class Bootstrap extends Job {
 
    public void doJob() {
        // Check if the database is empty
        if(User.count() == 0 
                || Restaurant.count() == 0
                || Food.count() == 0
                || Order.count() == 0) {
            Fixtures.delete();
            Fixtures.load("initial-data.yml");
        }
 
    }
}
