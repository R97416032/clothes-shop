package com.example.test.controller;


import com.example.test.entity.Orderthing;
import com.example.test.service.OrderthingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class OrderthingController {

    @Autowired
    private OrderthingService orderthingService;

    @GetMapping("/orderthingbyusertel")
    public ArrayList<Orderthing> getOrderthing(String usertel){ return orderthingService.getOrderthing(usertel);}

    @RequestMapping("/orderonebyorid")
    public Orderthing getOrderone(String order_ID){
        return orderthingService.getOrderone(order_ID); }

    @RequestMapping("/getuptypeorder")
    public Orderthing getuptypeorder(String order_ID){ return orderthingService.getuptypeorder(order_ID); }

    @GetMapping("/payorder")
    public Orderthing payorder(String order_ID,String payment){
        return orderthingService.payorder(order_ID,payment); }

    @RequestMapping("/deleteorder")
    public void deleteorder(String order_ID){
        orderthingService.deleteorder(order_ID); }

}
