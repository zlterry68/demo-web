package com.example.demo.models;
import lombok.Getter;
import lombok.Setter;

public class Mail {
    @Getter
    @Setter
    private String to;
    @Getter
    @Setter
    private String subject;
    @Getter
    @Setter
    private String content;

    public Mail(String to, String subject, String content) {
        this.to = to;
        this.subject = subject;
        this.content = content;
    }
    public Mail(){

    }
}
