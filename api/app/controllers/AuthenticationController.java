package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSerializer;

import play.cache.Cache;

import java.util.Base64;

public class AuthenticationController extends AppController {

    private static final String WWW_AUTHENTICATE = "WWW-Authenticate";
    private static final String REALM = "Basic realm=\"Food2Go\"";
    private static final int SESSION_EXPIRE = 10;
    private static final boolean SECURE = false;

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
                int maxAge = SESSION_EXPIRE * 60;
                Cache.set(newSessionId, user, String.valueOf(SESSION_EXPIRE) + "mn");
                response.setCookie("SESSIONID", newSessionId, DOMAIN, "/", maxAge, SECURE);
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
        response.setCookie("SESSIONID", "", DOMAIN, "/", -SESSION_EXPIRE, SECURE);
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