package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class RestaurantController extends AppController {

    public static void index() {
        render();
    }
	
    public static void getRestaurants(){
        List<Restaurant> restaurantList = Restaurant.find("order by name").fetch();
        renderJSON(restaurantList);
    }
	
    public static void getRestaurant(long restaurantId){
        Restaurant restaurant = Restaurant.findById(restaurantId);
		renderJSON(restaurant);
    }
	
    public static void createRestaurant(String name, String owner, String phoneNumber, String address){
        if (validation.hasErrors()) {
            flash.error("All fields with * are required!");
        }
        Restaurant newRestaurant = new Restaurant(name, owner, phoneNumber, address).save();
        flash.success("New Restaurant Added!");
    }
	
    public static void editRestaurant(Long restaurantId, String name, 
        String owner, String phoneNumber, String address){
        Restaurant restaurant = Restaurant.findById(restaurantId);
        if (validation.hasErrors()) {
            flash.error("All fields with * are required!");
            renderJSON(restaurant);
        }
        Restaurant.updateRestaurant(name, owner, phoneNumber, address);
        flash.success("Restaurant has been updated!");
        renderJSON(restaurant);
    }

}