package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSerializer;

public class UserController extends Controller {

    public static void getUsers() {
        List<User> userList = User.find("order by firstname asc").fetch();
        Gson gson = new Gson();
        String userJson = gson.toJson(userList);
        renderJSON(userJson);
    }

    public static void createUser() {
        // request.body => InputStream
        // params.get("body") => String

        String body = params.get("body");
        Gson gson = new Gson();
        User newUser = gson.fromJson(body, User.class);
        System.out.println(newUser);
        newUser.save();
        response.status = 201;
    }

}