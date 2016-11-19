package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSerializer;

public class AuthenticationController extends AppController {

    @Before(unless={"login", "authenticate"})
    public static void checkAuthenticated() {
        boolean authorized = true;      // @TODO: hardcoding authorization for now - fix later
        if (!session.contains("sessionid")) {
            // successful logged in
            response.status = 200;
        } else if (!authorized) {
            // user is logged in but not authorized to access resource
            response.status = 403;
        } else {
            // user is not logged in and sessionid is invalid
            response.status = 401;
        }
    }

    public static void authenticate(String sessionid) {
        String verifiedUser = getVerifiedID();
        if (verifiedUser == null) {
            // user is not logged in and sessionid is invalid
            response.status = 401;
            return;
        }
        session.put("sessionid", verifiedUser.id);
        // successful logged in
        response.status = 200;
    }

    public static void deleteSession() {
        
    }
}