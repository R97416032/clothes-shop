package com.example.test.service;

import com.example.test.entity.Orderthing;
import com.example.test.mapper.OrderMapper;
import com.example.test.mapper.OrderthingMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

@Service
public class OrderthingService {

    @Autowired
    private OrderthingMapper orderthingMapper;

    @Autowired
    private OrderMapper orderMapper;


    public ArrayList<Orderthing> getOrderthing(String usertel) { return orderthingMapper.getOrderthing(usertel); }

    public Orderthing getOrderone(String order_ID){             //得到订单具体信息(点开页)
        Orderthing orderone = new Orderthing();
        orderone = orderthingMapper.getOrderone(order_ID);
        if (orderone != null){
            return orderone;
        }
        else {
            return null;
        }
    }

    public Orderthing getuptypeorder(String order_ID){
        Orderthing orderthing = new Orderthing();
        orderthing = orderthingMapper.getOrderone(order_ID);
        if (orderthing.getType().equals("待收货")){
            orderthingMapper.getuptypeorder(order_ID);
            orderthing = orderthingMapper.getOrderone(order_ID);
        }
        return orderthing;
    }

    public Orderthing payorder(String order_ID,String payment){
        Orderthing orderthing = new Orderthing();
        orderthing = orderthingMapper.getOrderone(order_ID);
        if (orderthing.getType().equals("待付款")){
            orderthingMapper.getpayorder(order_ID,payment);
            orderthing = orderthingMapper.getOrderone(order_ID);
        }
        return orderthing;
    }

    public void deleteorder(String order_ID){
        orderthingMapper.deleteorder(order_ID);
        orderMapper.deleteorder_list(order_ID);
    }

}
