package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;
import play.db.jpa.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSerializer;
import com.google.gson.reflect.TypeToken;

import play.data.validation.*;

import play.cache.Cache;

import java.time.LocalDateTime;
import java.util.UUID;

import play.libs.Crypto;

public class AppController extends Controller {

    protected static final Gson gson = new Gson();
    protected static final String SERVER_URL = "http://localhost:11000";
    
    @Before
    protected static void setDefaultHeaders() {
        response.accessControl(SERVER_URL, "GET,POST,PUT,DELETE,OPTIONS", true);
        response.setContentTypeIfNotSet("application/json");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    protected static String getRequestBody() {
        return params.get("body");
    }

    public static <T extends Model> boolean hasValidationErrors(@Valid T t) {
        final Validation.ValidationResult validationResult = validation.valid(t);
        return !validationResult.ok;
    }

    protected static <C extends Model> C getObjectFromRequestBody(Class<C> c) {
        return gson.fromJson(getRequestBody(), c);
    }

    protected static Map<String, String> getHashMapFromRequestBody() {
        Map<String, String> map = gson.fromJson(getRequestBody(), 
                new TypeToken<Map<String, String>>(){}.getType());
        map.forEach((x, y) -> System.out.println("key: " + x + " , value: " + y));
        return map;
    }

    /**
    * Attempts to save the specified object and upon 
    * successful validation generates 201 status code,
    * otherwise generates 400 status code
    * @param t object of class to be saved
    */
    protected static <T extends Model> void save(@Valid T t, int successCode) {
        if (hasValidationErrors(t)) {
            response.status = 400;
        } else {
            t.save();
            System.out.println(t);
            response.status = successCode;
        }
    }

    protected static String getSessionId() {
        for (String c : request.cookies.keySet()) {
            System.out.println("key: " + c);
        }
        
        Http.Cookie sessionid = request.cookies.get("SESSIONID");
        if (sessionid == null) {
            return null;
        }
        System.out.println("getting session id: " + sessionid.value);
        return sessionid.value;
    }

    protected static String createSessionId() {
        String sessionid = Crypto.encryptAES(
                                LocalDateTime.now().toString()
                                + UUID.randomUUID());
        return sessionid;
    }

    protected static String getRequestParams(String key) {
        return request.params.get(key);
    }

    protected static User getUserFromSessionId() {
         String sessionid = getSessionId();
         System.out.println("session id is: " + sessionid);
         User user = (User)Cache.get(sessionid);
         return user;
    }
}