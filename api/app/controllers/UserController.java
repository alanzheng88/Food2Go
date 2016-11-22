package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;
import play.db.jpa.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSerializer;

import play.data.validation.*;

public class UserController extends AppController {

    public static void getUsers() {
        List<User> userList = User.find("order by firstname asc").fetch();
        String userJson = gson.toJson(userList);
        response.status = 200;
        renderJSON(userJson);
    }

    public static void createUser() {
        // request.body => InputStream
        // params.get("body") => String
        User newUser = getObjectFromRequestBody(User.class);
        try {
            newUser.encryptPassword();
            save(newUser);
        } catch (javax.persistence.PersistenceException e) {
            // creation or update breaks a unique constraint
            response.status = 409;
        }
    }

    public static void getUser() {
        User user = getUserFromSessionId();
        if (user == null) {
            response.status = 400;
            return;
        }

        String query = getRequestParams("query");
        System.out.println("query: " + query);
        if (query == null) {
            renderJSON(gson.toJson(user));
        } else if (query.equals("restaurants")) {
            List<Restaurant> restaurants = getRestaurants(user);
            System.out.println("restaurants: " + restaurants);
            if (restaurants != null) {
                String restaurantsJson = gson.toJson(restaurants);
                response.status = 200;
                renderJSON(restaurantsJson);
            }
        }
        response.status = 400;
    }

    public static List<Restaurant> getRestaurants(User user) {
        if (!user.role.equals("restaurantOwner")) {
            return null;
        }
        List<Restaurant> restaurants = 
            Restaurant.find("byRestaurantOwner", user).fetch();
        return restaurants;
    }
}