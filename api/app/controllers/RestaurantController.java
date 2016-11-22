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
        Restaurant newRestaurant = getObjectFromRequestBody(Restaurant.class);
        save(newRestaurant);
    }
	
    public static void editRestaurant(Long restaurantId, String name, String phoneNumber, 
            String email, String address, String description){
        Restaurant restaurant = Restaurant.findById(restaurantId);
        restaurant.update(name, phoneNumber, email, address, description);
        restaurant.save();
        response.status = 200;
    }

}