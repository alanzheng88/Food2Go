package controllers;

import play.*;

import play.mvc.*;
import play.data.Upload;

import java.util.*;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;

import models.*;
import play.db.jpa.*;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSerializer;

public class ImageController extends AppController {
	
    public static void uploadImage(Picture picture) {
        save(picture, 201);
    }

	public static void showImages()
	{
        render();
	}
	
	public static void showImage(Long photoId) {
    	Picture picture = Picture.findById(photoId);
        response.setContentTypeIfNotSet(picture.image.type());
        renderBinary(picture.image.get());
    }
}