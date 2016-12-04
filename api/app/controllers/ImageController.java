package controllers;

import play.*;
import play.mvc.*;

import java.util.*;

import models.*;

import java.io.*;

public class ImageController extends AppController {
	
    public static void getImage(long id) {
        Picture picture = Picture.findById(id);
        response.setContentTypeIfNotSet(picture.image.type());
        renderBinary(picture.image.get());
    }
    
}