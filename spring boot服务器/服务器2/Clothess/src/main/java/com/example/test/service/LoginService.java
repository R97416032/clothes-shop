package com.example.test.service;


import com.example.test.mapper.LoginMapper;
import com.example.test.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.*;

@Service
public class LoginService {


    @Autowired
    private LoginMapper loginMapper;


    public User loginCheck(String tel,String password){
        User user = new User();
        user.setTel(tel);
        user.setPassword(password);
        user = loginMapper.loginCheck(user);
        if (user !=null)
            return user;
        else {
            return null;
        }
    }

    public String register(String name,String tel,String password){
        User user=loginMapper.checktel(tel);
        if(user!=null){
            return "F";
        }
        else{
            loginMapper.register("user",name,tel,password);
            return "T";
        }
    }

    public String updataquery(String name,String password,String tel){
        loginMapper.updataquery(name,password,tel);
        return "OK";
    }
}
