package com.example.store.service;



import com.example.store.entity.User;
import com.example.store.mapper.LoginMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    public LoginMapper loginMapper;
//    对用户登录进行验证（手机号，密码）

    public User LoginCheck(User user){
        return loginMapper.loginCheck(user);
    }



//      进行账号注册，注册成功返回400，失败返回200,300,其中300是已有账号
    public int signUp(User user) {
        Integer m=0;
        User user1;
        user1=loginMapper.signupCheck(user);//检查注册账号是否已被注册，若未被注册则为空可以继续进行注册
        if(user1==null){
            m=loginMapper.signUp(user);
            System.out.println("观察插入情况");
            System.out.println(m);
            if(m==0)
                return 200;
            else
                return 400;

        }
        else{
            return 300;
        }
    }
}
