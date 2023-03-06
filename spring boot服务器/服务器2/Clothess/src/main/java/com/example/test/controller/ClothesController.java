package com.example.test.controller;

import com.example.test.entity.Clothes;
import com.example.test.entity.Orderthing;
import com.example.test.service.ClothesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Map;

@RestController
public class ClothesController {

    @Autowired
    private ClothesService clothesService;

    @PostMapping("/getclothesbyclothing_ID")
    public ArrayList<Clothes> getclothes(@RequestBody Map map){ return clothesService.getclothes(map);}

    @GetMapping("/getorlclothes")
    public ArrayList<Map<String,ArrayList<Clothes>>> getorlclothes(String usertel){
        return clothesService.getorlclothes(usertel);}

    @GetMapping("/getoridbydata")
    public ArrayList<Map<String,ArrayList<Clothes>>> getoridbydata(String datamin,String datamax,String usertel){
        return clothesService.getoridbydata(datamin, datamax,usertel);}


    @RequestMapping("/getclothesbytype")
    public ArrayList<Map<String,ArrayList<Clothes>>> getclothesbytype(String type,String usertel){ return clothesService.getclothesbytype(type,usertel);}

    @RequestMapping("/getclothesbyname")
    public ArrayList<Map<String,ArrayList<Clothes>>> getclothesbyname(String name){
        return clothesService.getclothesbyname(name);}


}
