package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSerializer;

public class AppController extends Controller {

    @Before
    public static void setDefaultHeaders() {
        response.accessControl("*");
    }
}