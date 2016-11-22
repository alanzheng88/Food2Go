package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

public class Application extends AppController {

    public static void index() {
        render();
    }

    public static void options() {
        response.status = 200;
    }
    
}