package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class FoodController extends AppController {

    private static String[] VALID_PARAMS = {"id"};

    public static void getFoods() {
        List<Food> foodList = Food.find("order by name").fetch();
        String foodJson = gson.toJson(foodList);
        renderJSON(foodJson);
    }

    public static void getFood(long foodId) {
        Food foodItem = Food.findById(foodId);
        String foodJson = gson.toJson(foodItem);
        renderJSON(foodJson);
    }

    public static void getUserFoods() {
        User user = getUserFromSessionId();

        if (user == null) {
            System.out.println("User is null");
            response.status = 401;
            return;
        }

        if (hasInvalidRequestParams(VALID_PARAMS)) { return; }

        String foodIds = getRequestParamsValue("id");
        List<Food> foodList = Food.findByIds(foodIds);
        if (foodList == null) {
            response.status = 400;
        }
        String foodJson = gson.toJson(foodList);
        renderJSON(foodJson);
    }
}