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

    // @Before(unless={"login", "authenticate"})
    public static void checkAuthenticatedStatus() {
        
        String sessionid = request.params.get("sessionid");
        System.out.println("sessionid is: " + sessionid);
        
        boolean authorized = false;
        if (Cache.get(sessionid) != null) {
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
                Cache.set(sessionid, user, "5mn");
                response.status = 200;
                return;
            }
        }
        
        // String verifiedUser = getVerifiedID();
        String verifiedUser = null;
        if (verifiedUser == null) {
            // user is not logged in and sessionid is invalid
            response.status = 401;
            return;
        }
        // session.put("sessionid", verifiedUser.id);
        // successful logged in
        response.status = 200;
    }

    public static void deleteSession() {
        
    }
}