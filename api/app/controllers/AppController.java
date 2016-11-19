package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSerializer;

public class AppController extends Controller {

    protected static Gson gson = new Gson();
    
    @Before
    public static void setDefaultHeaders() {
        response.accessControl("http://localhost:11000", "GET,POST,PUT,DELETE", true);
    }

    public static void getRequestBody() {
        return params.get("body");
    }

}