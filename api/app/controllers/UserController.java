package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;
import play.db.jpa.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSerializer;

import play.data.validation.*;

public class UserController extends AppController {

    public static void getUsers() {
        List<User> userList = User.find("order by firstname asc").fetch();
        String userJson = gson.toJson(userList);
        renderJSON(userJson);
    }

    public static void createUser() {
        // request.body => InputStream
        // params.get("body") => String
        User newUser = getObjectFromRequestBody(User.class);
        save(newUser);
        newUser.encryptPassword();
    }

}