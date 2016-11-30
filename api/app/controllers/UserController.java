package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;
import play.db.jpa.*;

import play.data.validation.*;

public class UserController extends AppController {

    private static String[] VALID_PARAMS = {"query"};

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
        if (newUser == null) {
            response.status = 400;
            return;
        }
        try {
            newUser.encryptPassword();
            save(newUser, 201);
            return;
        } catch (javax.persistence.PersistenceException e) {
            // creation or update breaks a unique constraint
            response.status = 409;
            return;
        }
    }

    public static void getUser() {
        User user = getUserFromSessionId();

        if (user == null) {
            System.out.println("User is null");
            response.status = 400;
            return;
        }

        if (hasInvalidRequestParams(VALID_PARAMS)) { return; }

        String query = getRequestParamsValue("query");
        System.out.println("query: " + query);

        if (query == null) {
            renderJSON(gson.toJson(user));
        }

        switch (query) {
        case "restaurants":
            if (!user.isRestaurantOwner()) {
                // user is forbidden to access restaurant info
                response.status = 403;
                return;
            }
            List<Restaurant> restaurants = getRestaurants(user);
            System.out.println("restaurants: " + restaurants);
            if (restaurants == null) {
                response.status = 404;
                return;
            }
            String restaurantsJson = gson.toJson(restaurants);
            response.status = 200;
            renderJSON(restaurantsJson);
            break;
        case "orders":
            List<Order> orders = Order.findOrderWith(user);
            System.out.println("orders: " + orders);
            if (orders == null) {
                response.status = 404;
                return;
            }
            String ordersJson = gson.toJson(orders);
            response.status = 200;
            renderJSON(ordersJson);
            break;
        default:
            response.status = 400;
            return;
        }
    }

    public static List<Restaurant> getRestaurants(User user) {
        if (user == null || !user.isRestaurantOwner()) { return null; }
        List<Restaurant> restaurants = 
            Restaurant.find("byRestaurantOwner", user).fetch();
        return restaurants;
    }
}