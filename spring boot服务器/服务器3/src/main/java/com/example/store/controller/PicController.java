package com.example.store.controller;

import com.example.store.entity.Img;
import com.example.store.entity.testpic;
import com.example.store.service.PicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.sql.SQLException;
import java.util.Base64;

import  com.example.store.tool.file_to_base64;

@Controller
@ResponseBody
public class PicController {
    @Autowired
    private PicService picService;
    @RequestMapping("/upload")
    public testpic upload(@RequestParam("file") MultipartFile file,@RequestParam("id") String id) throws IOException, SQLException {
        if (file.isEmpty()) {
            System.out.println("上传失败！"); }
        String filename = file.getOriginalFilename();
        String filePath = "H:/";
        File dest = new File(filePath + filename);
        try {
            file.transferTo(dest);
            System.out.println("上传成功！");
        } catch (IOException e) {
            System.out.println("上传失败！");
        }
        byte[] bytesArray = new byte[(int) dest.length()];
        FileInputStream fis = new FileInputStream(dest);
        fis.read(bytesArray); //read file into bytes[]
        fis.close();
        file_to_base64 tool=new file_to_base64();
        String result=tool.filetobase64(dest);
        picService.updatePic(bytesArray,id);
        testpic t=new testpic();
        t.setImg(result);
        return t;
    }
    @RequestMapping("/test1")
    public testpic test1() {
        Img i=picService.getPic("123");
        String result = new String(Base64.getEncoder().encode(i.getImg()));
        testpic t=new testpic();
        t.setImg(result);
        return t;
    }

}
