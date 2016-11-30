package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

import play.cache.Cache;

import java.util.Base64;

public class AuthenticationController extends AppController {

    private static final String WWW_AUTHENTICATE = "WWW-Authenticate";
    private static final String REALM = "Basic realm=\"Food2Go\"";

    public static void checkAuthenticatedStatus() {
        String sessionid = getSessionId();
        User user = (User)Cache.get(sessionid);
        if (user != null) {
            // successful logged in
            response.status = 200;
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
            String email = request.user;
            String password = request.password;
            
            // new login
            if ((user = User.authenticate(email, password)) != null) {
                System.out.println("New user or session");
                String newSessionId = createSessionId();
                System.out.println("Creating new session id: " + newSessionId);
                Cache.set(newSessionId, user, Config.SESSION_MAX_AGE);
                int maxAgeInSeconds = parseInt(Config.SESSION_MAX_AGE) * 60;
                response.setCookie(Config.SESSION_ID, newSessionId, 
                    DOMAIN, "/", maxAgeInSeconds, 
                    Boolean.parseBoolean(Config.SESSION_SECURE));
                response.status = 201;
                return;
            } else {
                // user is not authenticated
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
        response.setCookie(Config.SESSION_ID, "", 
            DOMAIN, "/", -parseInt(Config.SESSION_MAX_AGE), 
            Boolean.parseBoolean(Config.SESSION_SECURE));
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