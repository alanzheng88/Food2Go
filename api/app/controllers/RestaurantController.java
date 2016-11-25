package controllers;

import play.*;

import play.mvc.*;

import java.util.*;

import models.*;
import play.db.jpa.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSerializer;

public class RestaurantController extends AppController {
	
    public static void getRestaurants(){
        List<Restaurant> restaurantList = Restaurant.find("order by name").fetch();
        String restaurantJson = gson.toJson(restaurantList);
        renderJSON(restaurantList);
    }
	
    public static void getRestaurant(long restaurantId){
        Restaurant restaurant = Restaurant.findById(restaurantId);
        renderJSON(restaurant);
    }
	
    public static void createRestaurant() {
        Restaurant restaurant = getObjectFromRequestBody(Restaurant.class);
        User user = getUserFromSessionId();
        if (user == null) {
            // user is unauthorized to create restaurant
            response.status = 401;
            return;
        } else if (user.isRestaurantOwner()) {
            restaurant.restaurantOwner = user;
            save(restaurant, 201);
            return;
        } else {
            // user is forbidden to create a restaurant
            response.status = 403;
            return;
        }
    }
	
    public static void updateRestaurant(Long restaurantId, String name, String phoneNumber, 
            String email, String address, String description){
        Restaurant restaurant = Restaurant.findById(restaurantId);
        if (restaurant == null) {
            response.status = 400;
            return;
        } else {
            restaurant.update(name, phoneNumber, email, address, description);
            save(restaurant, 200);
        }
    }

}