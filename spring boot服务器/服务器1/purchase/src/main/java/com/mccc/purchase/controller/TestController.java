package com.mccc.purchase.controller;

import com.alibaba.fastjson.JSONObject;
import com.mccc.purchase.mapper.TestMapper;
import com.mccc.purchase.pojo.TestPojo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;

@RestController
public class TestController {
    @Autowired
    private TestMapper test ;

    private ArrayList<TestPojo> stus;
    @RequestMapping("/test")
    public String test(){
        return "hello";
    }

    @RequestMapping("/findall")
    public ArrayList<String> findAllclo() throws SQLException {
        ArrayList<byte []> imgList=test.findAllClothImg();
        ArrayList<String> imgBsae64List=new ArrayList<>();
        byte[] img=null;
        String res=null;
        for (int i=0;i<imgList.size();i++){
            img=imgList.get(i);
            res=new String(Base64.getEncoder().encode(img));
            imgBsae64List.add(res);
        }

        return imgBsae64List;
    }

    @PostMapping ("/ttt")
    public String ttt(MultipartFile img, String user, HttpServletRequest req) throws IOException {
        byte [] clothesImg = img.getBytes();
        String res=null;

        res = new String(Base64.getEncoder().encode(clothesImg));

        return res;

    }
}
