import org.junit.*;
import play.test.*;
import play.mvc.*;
import play.mvc.Http.*;
import models.*;

public class ApplicationTest extends FunctionalTest {

    @Test
    public void testActiveApiPage() {
        Response response = GET("/");
        assertIsOk(response);
    }
    
}