package com.example.test.controller;


import com.example.test.entity.Order;
import com.example.test.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/getorderbyorder_ID")
    public Order getOrder(String order_ID){ return orderService.getOrder(order_ID);}

    @GetMapping("/getclothesbyorder_ID")
    public ArrayList<String> getclothesID(String order_ID){
        return orderService.getclothesID(order_ID);}

    @GetMapping("/getoridbyustel")
    public ArrayList<String> getoridbyustel(String usertel){ return orderService.getoridbyustel(usertel);}
}
