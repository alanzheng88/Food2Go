package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSerializer;

import play.cache.Cache;

public class AuthenticationController extends AppController {

    public static void checkAuthenticatedStatus() {
        String sessionid = getSessionId();
        System.out.println("sessionid is: " + sessionid);
        
        boolean authorized = true; // hardcoding for now -- fix later
        User user = (User)Cache.get(sessionid);
        if (user != null) {
            // successful logged in
            response.status = 200;
        } else if (!authorized) {
            // user is logged in but not authorized to access resource
            response.status = 403;
            return;
        } else {
            // user is not logged in and sessionid is invalid
            response.status = 401;
            return;
        }
    }

    public static void authenticate() {
        Map<String, String> map = getHashMapFromRequestBody();
        if (map.containsKey("sessionid") && 
                map.containsKey("email") &&
                map.containsKey("password")) {

            String sessionid = map.get("sessionid");
            String email = map.get("email");
            String password = map.get("password");
            User user;
            if ((user = User.authenticate(email, password)) != null) {
                Cache.set(sessionid, user, "10mn");
                response.status = 200;
                return;
            } else {
                response.status = 401;
                return;
            }
        } else {
            response.status = 400;
            return;
        }
       
    }

    public static void deleteSession() {
        String sessionid = getSessionId();
        boolean isSuccessfulDeletion = Cache.safeDelete(sessionid);
        if (isSuccessfulDeletion) {
            // successfully deleted session
            response.status = 200;
            return;
        } else {
            // there is no session to delete
            response.status = 204;
            return;
        }
    }

}