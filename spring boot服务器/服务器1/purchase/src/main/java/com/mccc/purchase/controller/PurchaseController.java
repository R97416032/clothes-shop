package com.mccc.purchase.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.mccc.purchase.pojo.ClothingPojo;
import com.mccc.purchase.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/purchase")
public class PurchaseController {
    @Autowired
    private PurchaseService purchase;

    @GetMapping(value = "/getClothes")
    public ArrayList<ClothingPojo> getClothes(String name){
        return purchase.getClothes(name);
    }

    @GetMapping( value = "/getTheClothes")
    public ArrayList<ClothingPojo> getTheClothes(String name){
        return purchase.getTheClothes(name);
    }

    @GetMapping( value = "/loadSkuInfo")
    public JSONObject loadSkuInfo(String name){
        return purchase.loadSkuInfo(name);
    }

    @PostMapping(value = "/addCart")
    public void addCart(@RequestBody JSONObject request){
        purchase.addCart(request);
    }

    @PostMapping(value = "/submitOrder")
    public JSONObject submitOrder(@RequestBody JSONObject request){
        String id = purchase.submitOrder(request);
        JSONObject data = new JSONObject();
        data.put("id",id);
       return data;
    }

    @PostMapping(value = "/payOrder")
    public void payOrder(@RequestBody JSONObject request){
        purchase.payOrder(request);
    }

    @GetMapping(value = "/getCartList")
    public ArrayList<JSONObject> getCartList(String usertel){
        return purchase.getCartList(usertel);
    }

    @PostMapping(value = "/submitCartOrder")
    public JSONObject submitCartOrder(@RequestBody JSONObject request){
        String id = purchase.submitCartOrder(request);
        JSONObject data = new JSONObject();
        data.put("id",id);
        return data;
    }

    @PostMapping(value = "/cartListDel")
    public void cartListDel(@RequestBody JSONObject request){
        List<String> ids = JSONArray.parseArray(request.getJSONArray("ids").toJSONString(),String.class);
        purchase.cartListDel(ids);
    }
}
