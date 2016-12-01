package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class OrderController extends AppController {

    public static void getOrders(){
        List<Order> orderList = Order.find("order by totalCost").fetch();
        String orderJson = gson.toJson(orderList);
        renderJSON(orderJson);
    }
}