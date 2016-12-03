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
	
    public static void getPoint(){
        User user = getUserFromSessionId();
        renderJSON(user.point);
    }
	
    public static void getPoints(){
        List<Point> pointList = Point.find("order by points").fetch();
        renderJSON(pointList);
    }
	
    public static void createPoint() {
        Point point = getObjectFromRequestBody(Point.class);
        User user = getUserFromSessionId();
        if (user == null) {
            // no user to assign points to.
            response.status = 401;
            return;
         } else {
		    user.point = point;
            save(user, 201);
            return;
        } 
    }
	
    public static void updatePoint(){
        Point point = getObjectFromRequestBody(Point.class);
        User user = getUserFromSessionId();
        Point userPoint = Point.findById(user.id);
        userPoint.points = point.points;
        save(userPoint, 200);      
    }

}