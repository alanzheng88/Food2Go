package controllers;

import play.Play;

public class Config {
    public static final String DATE_FORMAT              =   getPropertyValue("date.format");
    public static final String SESSION_ID               =   getPropertyValue("session.cookie");
    public static final String SESSION_MAX_AGE          =   getPropertyValue("application.session.maxAge");
    public static final String SESSION_SECURE           =   getPropertyValue("application.session.secure");

    public static String getPropertyValue(String property) {
        return Play.configuration.getProperty(property);
    }
}