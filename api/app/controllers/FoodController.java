package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class FoodController extends AppController {

    public static void getFoods(){
        List<Food> foodList = Food.find("order by name").fetch();
        String foodJson = gson.toJson(foodList);
        renderJSON(foodJson);
    }
}