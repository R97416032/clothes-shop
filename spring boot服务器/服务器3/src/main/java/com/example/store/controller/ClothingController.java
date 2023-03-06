package com.example.store.controller;


import com.example.store.entity.Clothing;
import com.example.store.entity.Img;
import com.example.store.service.ClothingService;
import com.example.store.service.PicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;

@RestController
@RequestMapping("/clothing")
public class ClothingController {

    @Autowired
    ClothingService clothingService;
    PicService picService;
    @RequestMapping("/findall")
    public ArrayList<Clothing> findAllclo() throws SQLException {
        ArrayList<Clothing> clothingArrayList=clothingService.findAllclo();
        byte[] img=null;
        String res=null;
        for (int i=0;i<clothingArrayList.size();i++){
            img=clothingArrayList.get(i).getImg();
            res=new String(Base64.getEncoder().encode(img));
            clothingArrayList.get(i).setBase64(res);
        }
        return clothingArrayList;
    }

    @RequestMapping("/findbyclass")
    public ArrayList<Clothing> findAllbyclass(@RequestBody Clothing clothing)
    {
        ArrayList<Clothing> clothingArrayList=clothingService.findAllbyclass(clothing);
        byte[] img=null;
        String res=null;
        for (int i=0;i<clothingArrayList.size();i++){
            img=clothingArrayList.get(i).getImg();
            res=new String(Base64.getEncoder().encode(img));
            clothingArrayList.get(i).setBase64(res);
        }
        return clothingArrayList;
    }

    @PostMapping("/findbyname")

    public ArrayList<Clothing> findAllbyname(@RequestBody Clothing clothing)
    {
        ArrayList<Clothing> clothingArrayList=clothingService.findAllByName(clothing);
        byte[] img=null;
        String res=null;
        for (int i=0;i<clothingArrayList.size();i++){
            img=clothingArrayList.get(i).getImg();
            res=new String(Base64.getEncoder().encode(img));
            clothingArrayList.get(i).setBase64(res);
        }
        return clothingArrayList;
    }


    @PostMapping("/del")
    public int delbyid(@RequestBody Clothing clothing){
        System.out.println("接收到的服装");
        System.out.println(clothing);
        return clothingService.delById(clothing);
    }

    @PostMapping("/insert")
    public int insertclo(@RequestBody Clothing clothing){
        System.out.println("接受到要插入的服装信息");
        System.out.println(clothing);
        return clothingService.insertclo(clothing);
    }
    @PostMapping("/change")
    public int updatclo(@RequestBody Clothing clothing){
        System.out.println("更改的服装信息");
        System.out.println(clothing);
        return clothingService.updateclo(clothing);
    }
}
