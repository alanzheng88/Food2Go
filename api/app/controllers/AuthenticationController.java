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
        
        User user;
        if ((user = getUserFromSessionId()) != null) {
            // user is already logged in
            response.status = 200;
            return;
        } else {
            // user is not logged in

            Map<String, String> map = getHashMapFromRequestBody();

            if (!(map.containsKey("email") &&
                    map.containsKey("password"))) {
                // user needs to provide missing params
                response.status = 400;
                return;
            }

            String email = map.get("email");
            String password = map.get("password");
            
            // new login
            if ((user = User.authenticate(email, password)) != null) {
                System.out.println("New user or session");
                String newSessionId = createSessionId();
                System.out.println("Creating new session id: " + newSessionId);
                Cache.set(newSessionId, user, "10mn");
                response.setCookie("SESSIONID", newSessionId);
                response.setHeader("CACHE_CONTROL", "max-age=600");
                response.status = 201;
                return;
            } else {
                // user is authenticated
                response.status = 401;
            }
        }
    }

    public static void deleteSession() {
        String sessionid = getSessionId();
        if  (sessionid == null) {
            response.status = 400;
            return;
        }
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