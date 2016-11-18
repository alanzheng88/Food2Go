package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSerializer;

public class Application extends Controller {

    public static void index() {
        render();
    }
	
	public static void getRestaurants(){
	    List<Restaurant> restaurantList = Restaurant.find("order by name").fetch();
        renderJSON(restaurantList);
	}
	
	public static void createRestaurant(@Required String name, @Required String owner, @Required String phoneNumber, String address){
        if (validation.hasErrors()) {
    	    flash.error("All fields with * are required!");
        }
        addRestaurant(name, owner, phoneNumber, address);
    }
	
	public static void editRestaurant(Long restaurantId, @Required String name, 
        @Required String owner, @Required String phoneNumber, String address){
        Restaurant restaurant = Restaurant.findById(restaurantId);
        if (validation.hasErrors()) {
            flash.error("All fields with * are required!");
            renderJSON("Application/edit.html", restaurant);
        }
        restaurant.updateRestaurant(@Required String name, @Required String owner, @Required String phoneNumber, String address);
        flash.success("Restaurant has been updated!");
        show(restaurant.id);
    }
	
    public static void addRestaurant(String name, String owner, String phoneNumber, String address){
        Restaurant newRestaurant = new Restaurant(name, owner, phoneNumber, address).save();
        flash.success("New Restaurant Added!");
        getRestaurants();
	}
}