package com.example.store.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.store.entity.order;
import com.example.store.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.ArrayList;
@Controller
@ResponseBody

public class OrderController{
    @Autowired
    private OrderService orderService;
    @RequestMapping("/order")
    public ArrayList<order> orderTable(@RequestBody String type){
        JSONObject json = JSONObject.parseObject(type);
        String s= (String) json.get("type");
        return orderService.orders(s);
    }
    @RequestMapping("/delivery")
    public int Delivery(@RequestBody String data){
        JSONObject json = JSONObject.parseObject(data);
        String id= (String) json.get("id");
        String delivery_num= (String) json.get("delivery_num");
        return orderService.updataDelivery(id,delivery_num);
    }
}
