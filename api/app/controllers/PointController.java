package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;
import play.db.jpa.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSerializer;

public class PointController extends AppController {
	
    public static void getPoint(long userId){
        Point userPoint = Point.findById(userId);
        renderJSON(userPoint);
    }
	
    public static void createPoint() {
        Point point = getObjectFromRequestBody(Point.class);
        User user = getUserFromSessionId();
        if (user == null) {
            // no user to assign points to.
            response.status = 401;
            return;
        } else {
		    point.userID = user;
            save(point, 201);
            return;
        } 
    }
	
    public static void updatePoint(Long userId, int pointDelta){
        Point userPoint = Point.findById(userId);
        userPoint.points = userPoint.points + pointDelta;
        save(userPoint, 200);      
    }

}