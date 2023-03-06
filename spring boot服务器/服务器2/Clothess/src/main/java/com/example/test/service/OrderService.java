package com.example.test.service;

import com.example.test.entity.Order;
import com.example.test.entity.User;
import com.example.test.mapper.OrderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;

    public Order getOrder(String order_ID){
        Order order = new Order();
        order.setOrder_ID(order_ID);
        order = orderMapper.getOrder(order_ID);
        if (order !=null)
            return order;
        else {
            return null;
        }
    }

    public ArrayList<String> getclothesID(String order_ID){
        return orderMapper.getclothesID(order_ID); }

    public ArrayList<String> getoridbyustel(String usertel){ return orderMapper.getoridbyustel(usertel);}


}
