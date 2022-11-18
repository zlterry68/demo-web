package com.example.demo.dao;

public interface MailDao {

    void sendEmail(String to, String subject, String content);
}
