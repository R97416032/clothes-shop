package com.example.store.service;

import com.example.store.entity.order;
import com.example.store.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

@Service
public class OrderService {
    @Autowired
    private OrderMapper orderMapper;
    public ArrayList<order> orders(String type){
        return orderMapper.orders(type);
    };
    public int updataDelivery(String id, String delivery_num) {
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String times = simpleDateFormat.format(date);
        return orderMapper.updateDelivery(id,delivery_num,times);
    }
}
