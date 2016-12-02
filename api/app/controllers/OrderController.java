package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class OrderController extends AppController {

    public static void getOrders() {
        List<Order> orderList = Order.find("order by totalCost").fetch();
        String orderJson = gson.toJson(orderList);
        renderJSON(orderJson);
    }

    public static void getUserOrders() {
        User user = getUserFromSessionId();
        if (user == null) {
            response.status = 401;
            return;
        }
        List<Order> orders = Order.findOrderWith(user);
        System.out.println("orders: " + orders);
        if (orders == null) {
            response.status = 404;
            return;
        }
        String ordersJson = gson.toJson(orders);
        response.status = 200;
        renderJSON(ordersJson);
    }

    public static void createOrder() {
        User user = getUserFromSessionId();
        if (user == null) {
            response.status = 401;
            return;
        }

        Map<String, String> requestBody = getHashMapFromRequestBody();
        try {
            Restaurant restaurant = Restaurant.findById(Long.parseLong(requestBody.get("restaurantId")));
            String destinationAddress = requestBody.get("destinationAddress");
            String totalCost = requestBody.get("totalCost");
            int status = Integer.parseInt(requestBody.get("status"));
            List<Food> foodList = Food.findByIds(requestBody.get("foodIds"));
            Order newOrder = new Order(restaurant, destinationAddress, totalCost, status, foodList);
            if (hasValidationErrors(newOrder)) {
                System.out.println("validation error in create order");
                response.status = 400;
                return;
            }
            newOrder.save();
            response.status = 200;
        } catch (NumberFormatException e) {
            response.status = 400;
            return;
        } catch (Exception e) {
            response.status = 500;
            return;
        }
    }
}