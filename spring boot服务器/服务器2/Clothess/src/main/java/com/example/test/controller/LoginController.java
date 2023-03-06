package com.example.test.controller;

import com.example.test.entity.User;
import com.example.test.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @Autowired
    private LoginService loginService;

    @RequestMapping("/login")
    public User login(String tel,String password){ return loginService.loginCheck(tel, password);}

    @RequestMapping("register")
    public String register(String name,String tel,String password){
        return loginService.register(name, tel, password);}

    @RequestMapping("/updataquery")
    public String updataquery(String name,String password,String tel){ return loginService.updataquery(name, password,tel);}
}
