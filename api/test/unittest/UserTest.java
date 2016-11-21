package unittest;

import org.junit.*;
import java.util.*;
import play.test.*;
import models.*;
import controllers.AppController;

import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

public class UserTest extends UnitTest {

    @Before
    public void setUp() {
        Fixtures.deleteDatabase();
        // Fixtures.loadModels("data.yml");
    }

    @Test
    public void testCreateValidRestaurantOwner() {
        User user = new User("John", "Doe", "johndoe@email.com",
                                "password1", "restaurantOwner");
        assertFalse("User cannot be created with the role 'restaurantOwner'",
                    AppController.hasValidationErrors(user));
    }

    @Test
    public void testCreateValidCustomer() {
        User user = new User("John", "Doe", "johndoe@email.com",
                                "password1", "customer");
        assertFalse("User cannot be created with the role 'customer'",
                    AppController.hasValidationErrors(user));
    }

    @Test
    public void testCreateUserWithInvalidRole() {
        User user = new User("John", "Doe", "johndoe@email.com",
                                "password1", "invalidRole");
        assertTrue("User must not be created with an invalid role",
                    AppController.hasValidationErrors(user));
    }

    @Test
    public void testUserWithPasswordBelowMinLength() {
        User user = new User("John", "Doe", "johndoe@email.com",
                                "12345", "invalidRole");
        assertTrue("User must not be created with a password of length less than 6",
                    AppController.hasValidationErrors(user));
    }

    @Test
    public void testUserWithPasswordAtMinLength() {
        User user = new User("John", "Doe", "johndoe@email.com",
                                "123456", "invalidRole");
        assertTrue("User cannot be created with a password of length 6",
                    AppController.hasValidationErrors(user));
    }

    @Test
    public void testUserWithEmptyFirstName() {
        User user = new User("", "Doe", "johndoe@email.com",
                                "123456", "invalidRole");
        assertTrue("User must be created with a nonempty firstname",
                    AppController.hasValidationErrors(user));
    }

    @Test
    public void testEncryptPassword() {
        User user = new User("John", "Doe", "johndoe@email.com",
                                "password1", "customer");
        String oldPassword = user.password;
        user.encryptPassword();
        user.save();
        List<User> userList = User.find("email", user.email).fetch();
        User dbUser = userList.get(0);
        assertThat("Password must be encrypted in the db", oldPassword, 
                   is(not(dbUser.password)));
    }

    @Test
    public void testUserCreationWithDuplicateEmail() {
        User user1 = new User("John", "Doe", "johndoe@email.com",
                              "password1", "customer");
        User user2 = new User("John", "Doe", "johndoe@email.com",
                              "password1", "customer");
        assertFalse("User must not fail validation", 
                    AppController.hasValidationErrors(user1));
        user1.save();
        try {
            user2.save();
            fail("Creation of a user with a duplicate email must not occur");
        } catch (javax.persistence.PersistenceException e) {}
    }

}
