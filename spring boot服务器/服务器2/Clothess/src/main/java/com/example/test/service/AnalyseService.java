package com.example.test.service;


import com.example.test.entity.Clothes;
import com.example.test.entity.Order;
import com.example.test.entity.Orderthing;
import com.example.test.entity.SellcloTynum;
import com.example.test.mapper.ClothesMapper;
import com.example.test.mapper.OrderMapper;
import com.example.test.mapper.OrderthingMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
public class AnalyseService {

    @Autowired
    ClothesMapper clothesMapper;

    @Autowired
    OrderthingMapper orderthingMapper;

    @Autowired
    OrderMapper orderMapper;

    public ArrayList<Float> getsellcostquerter(String usertel){
        ArrayList<Float> cost = new ArrayList<>();
        ArrayList<Orderthing> orderthingsone = new ArrayList<>();
        ArrayList<Orderthing> orderthingstwo = new ArrayList<>();
        ArrayList<Orderthing> orderthingsthree = new ArrayList<>();
        ArrayList<Orderthing> orderthingsfour = new ArrayList<>();
        ArrayList<Order> ordersone = new ArrayList<>();
        ArrayList<Order> orderstwo = new ArrayList<>();
        ArrayList<Order> ordersthree = new ArrayList<>();
        ArrayList<Order> ordersfour = new ArrayList<>();
        ArrayList<String> orlderidone = new ArrayList<>();
        ArrayList<String> orlderidtwo = new ArrayList<>();
        ArrayList<String> orlderidthree = new ArrayList<>();
        ArrayList<String> orlderidfour = new ArrayList<>();
        Float costone = 0.0f;
        Float costtwo = 0.0f;
        Float costthree = 0.0f;
        Float costfour = 0.0f;
        orderthingsone = orderthingMapper.getorione();
        for (int i=0;i<orderthingsone.size();i++){
            Orderthing orderthingone = new Orderthing();
            orderthingone = orderthingsone.get(i);
            if(orderthingone.getUsertel().equals(usertel)){
                orlderidone.add(orderthingone.getID());
            }
        }
        for (int i=0;i<orlderidone.size();i++){
            ArrayList<Order> orders1 = new ArrayList<>();
            orders1 = orderMapper.getnum(orlderidone.get(i));
            for (int m=0;m<orders1.size();m++){
                Order orderone = new Order();
                orderone = orders1.get(m);
                ordersone.add(orderone);
            }
        }
        for (int i=0;i<ordersone.size();i++){
            Order orderone =new Order();
            Float cloprice;
            Integer num;
            orderone = ordersone.get(i);
            num = orderone.getQuantity();
            cloprice = clothesMapper.getcloprice(orderone.getClothing_ID());
            costone =costone + num*cloprice;
        }
        cost.add(costone);
        orderthingstwo = orderthingMapper.getoritwo();
        for (int i=0;i<orderthingstwo.size();i++){
            Orderthing orderthingone = new Orderthing();
            orderthingone = orderthingstwo.get(i);
            if(orderthingone.getUsertel().equals(usertel)){
                orlderidtwo.add(orderthingone.getID());
            }
        }
        for (int i=0;i<orlderidtwo.size();i++){
            ArrayList<Order> orders1 = new ArrayList<>();
            orders1 = orderMapper.getnum(orlderidtwo.get(i));
            for (int m=0;m<orders1.size();m++){
                Order orderone = new Order();
                orderone = orders1.get(m);
                orderstwo.add(orderone);
            }
        }
        for (int i=0;i<orderstwo.size();i++){
            Order orderone =new Order();
            Float cloprice;
            Integer num;
            orderone = orderstwo.get(i);
            num = orderone.getQuantity();
            cloprice = clothesMapper.getcloprice(orderone.getClothing_ID());
            costtwo =costtwo + num*cloprice;
        }
        cost.add(costtwo);
        orderthingsthree = orderthingMapper.getorithree();
        for (int i=0;i<orderthingsthree.size();i++){
            Orderthing orderthingone = new Orderthing();
            orderthingone = orderthingsthree.get(i);
            if(orderthingone.getUsertel().equals(usertel)){
                orlderidthree.add(orderthingone.getID());
            }
        }
        for (int i=0;i<orlderidthree.size();i++){
            ArrayList<Order> orders1 = new ArrayList<>();
            orders1 = orderMapper.getnum(orlderidthree.get(i));
            for (int m=0;m<orders1.size();m++){
                Order orderone = new Order();
                orderone = orders1.get(m);
                ordersthree.add(orderone);
            }
        }
        for (int i=0;i<ordersthree.size();i++){
            Order orderone =new Order();
            Float cloprice;
            Integer num;
            orderone = ordersthree.get(i);
            num = orderone.getQuantity();
            cloprice = clothesMapper.getcloprice(orderone.getClothing_ID());
            costthree =costthree + num*cloprice;
        }
        cost.add(costthree);
        orderthingsfour = orderthingMapper.getorifour();
        for (int i=0;i<orderthingsfour.size();i++){
            Orderthing orderthingone = new Orderthing();
            orderthingone = orderthingsfour.get(i);
            if(orderthingone.getUsertel().equals(usertel)){
                orlderidfour.add(orderthingone.getID());
            }
        }
        for (int i=0;i<orlderidfour.size();i++){
            ArrayList<Order> orders1 = new ArrayList<>();
            orders1 = orderMapper.getnum(orlderidfour.get(i));
            for (int m=0;m<orders1.size();m++){
                Order orderone = new Order();
                orderone = orders1.get(m);
                ordersfour.add(orderone);
            }
        }
        for (int i=0;i<ordersfour.size();i++){
            Order orderone =new Order();
            Float cloprice;
            Integer num;
            orderone = ordersfour.get(i);
            num = orderone.getQuantity();
            cloprice = clothesMapper.getcloprice(orderone.getClothing_ID());
            costfour =costfour + num*cloprice;
        }
        cost.add(costfour);
        return cost;
    }


    public ArrayList<Float> getsellcostyear(String usertel){
        ArrayList<Float> cost = new ArrayList<>();
        ArrayList<Orderthing> orderthings2016 = new ArrayList<>();
        ArrayList<Orderthing> orderthings2017 = new ArrayList<>();
        ArrayList<Orderthing> orderthings2018 = new ArrayList<>();
        ArrayList<Orderthing> orderthings2019 = new ArrayList<>();
        ArrayList<Orderthing> orderthings2020 = new ArrayList<>();
        ArrayList<Orderthing> orderthings2021 = new ArrayList<>();
        ArrayList<Order> orders16 = new ArrayList<>();
        ArrayList<Order> orders17 = new ArrayList<>();
        ArrayList<Order> orders18 = new ArrayList<>();
        ArrayList<Order> orders19 = new ArrayList<>();
        ArrayList<Order> orders20 = new ArrayList<>();
        ArrayList<Order> orders21 = new ArrayList<>();
        ArrayList<String> orlderid2016 = new ArrayList<>();
        ArrayList<String> orlderid2017 = new ArrayList<>();
        ArrayList<String> orlderid2018 = new ArrayList<>();
        ArrayList<String> orlderid2019 = new ArrayList<>();
        ArrayList<String> orlderid2020 = new ArrayList<>();
        ArrayList<String> orlderid2021 = new ArrayList<>();
        Float cost2016 = 0.0f;
        Float cost2017 = 0.0f;
        Float cost2018 = 0.0f;
        Float cost2019 = 0.0f;
        Float cost2020 = 0.0f;
        Float cost2021 = 0.0f;
        orderthings2016 = orderthingMapper.getori2016();
        for (int i=0;i<orderthings2016.size();i++){
            Orderthing orderthingone = new Orderthing();
            orderthingone = orderthings2016.get(i);
            if(orderthingone.getUsertel().equals(usertel)){
                orlderid2016.add(orderthingone.getID());
            }
        }
        for (int i=0;i<orlderid2016.size();i++){
            ArrayList<Order> orders1 = new ArrayList<>();
            orders1 = orderMapper.getnum(orlderid2016.get(i));
            for (int m=0;m<orders1.size();m++){
                Order orderone = new Order();
                orderone = orders1.get(m);
                orders16.add(orderone);
            }
        }
        for (int i=0;i<orders16.size();i++){
            Order orderone =new Order();
            Float cloprice;
            Integer num;
            orderone = orders16.get(i);
            num = orderone.getQuantity();
            cloprice = clothesMapper.getcloprice(orderone.getClothing_ID());
            cost2016 =cost2016 + num*cloprice;
        }
        cost.add(cost2016);
        orderthings2017 = orderthingMapper.getori2017();
        for (int i=0;i<orderthings2017.size();i++){
            Orderthing orderthingone = new Orderthing();
            orderthingone = orderthings2017.get(i);
            if(orderthingone.getUsertel().equals(usertel)){
                orlderid2017.add(orderthingone.getID());
            }
        }
        for (int i=0;i<orlderid2017.size();i++){
            ArrayList<Order> orders1 = new ArrayList<>();
            orders1 = orderMapper.getnum(orlderid2017.get(i));
            for (int m=0;m<orders1.size();m++){
                Order orderone = new Order();
                orderone = orders1.get(m);
                orders17.add(orderone);
            }
        }
        for (int i=0;i<orders17.size();i++){
            Order orderone =new Order();
            Float cloprice;
            Integer num;
            orderone = orders17.get(i);
            num = orderone.getQuantity();
            cloprice = clothesMapper.getcloprice(orderone.getClothing_ID());
            cost2017 =cost2017 + num*cloprice;
        }
        cost.add(cost2017);
        orderthings2018 = orderthingMapper.getori2018();
        for (int i=0;i<orderthings2018.size();i++){
            Orderthing orderthingone = new Orderthing();
            orderthingone = orderthings2018.get(i);
            if(orderthingone.getUsertel().equals(usertel)){
                orlderid2018.add(orderthingone.getID());
            }
        }
        for (int i=0;i<orlderid2018.size();i++){
            ArrayList<Order> orders1 = new ArrayList<>();
            orders1 = orderMapper.getnum(orlderid2018.get(i));
            for (int m=0;m<orders1.size();m++){
                Order orderone = new Order();
                orderone = orders1.get(m);
                orders18.add(orderone);
            }
        }
        for (int i=0;i<orders18.size();i++){
            Order orderone =new Order();
            Float cloprice;
            Integer num;
            orderone = orders18.get(i);
            num = orderone.getQuantity();
            cloprice = clothesMapper.getcloprice(orderone.getClothing_ID());
            cost2018 =cost2018 + num*cloprice;
        }
        cost.add(cost2018);
        orderthings2019 = orderthingMapper.getori2019();
        for (int i=0;i<orderthings2019.size();i++){
            Orderthing orderthingone = new Orderthing();
            orderthingone = orderthings2019.get(i);
            if(orderthingone.getUsertel().equals(usertel)){
                orlderid2019.add(orderthingone.getID());
            }
        }
        for (int i=0;i<orlderid2019.size();i++){
            ArrayList<Order> orders1 = new ArrayList<>();
            orders1 = orderMapper.getnum(orlderid2019.get(i));
            for (int m=0;m<orders1.size();m++){
                Order orderone = new Order();
                orderone = orders1.get(m);
                orders19.add(orderone);
            }
        }
        for (int i=0;i<orders19.size();i++){
            Order orderone =new Order();
            Float cloprice;
            Integer num;
            orderone = orders19.get(i);
            num = orderone.getQuantity();
            cloprice = clothesMapper.getcloprice(orderone.getClothing_ID());
            cost2018 =cost2019 + num*cloprice;
        }
        cost.add(cost2019);
        orderthings2020 = orderthingMapper.getori2020();
        for (int i=0;i<orderthings2020.size();i++){
            Orderthing orderthingone = new Orderthing();
            orderthingone = orderthings2020.get(i);
            if(orderthingone.getUsertel().equals(usertel)){
                orlderid2020.add(orderthingone.getID());
            }
        }
        for (int i=0;i<orlderid2020.size();i++){
            ArrayList<Order> orders1 = new ArrayList<>();
            orders1 = orderMapper.getnum(orlderid2020.get(i));
            for (int m=0;m<orders1.size();m++){
                Order orderone = new Order();
                orderone = orders1.get(m);
                orders20.add(orderone);
            }
        }
        for (int i=0;i<orders20.size();i++){
            Order orderone =new Order();
            Float cloprice;
            Integer num;
            orderone = orders20.get(i);
            num = orderone.getQuantity();
            cloprice = clothesMapper.getcloprice(orderone.getClothing_ID());
            cost2020 =cost2020 + num*cloprice;
        }
        cost.add(cost2020);
        orderthings2021 = orderthingMapper.getori2021();
        for (int i=0;i<orderthings2021.size();i++){
            Orderthing orderthingone = new Orderthing();
            orderthingone = orderthings2021.get(i);
            if(orderthingone.getUsertel().equals(usertel)){
                orlderid2021.add(orderthingone.getID());
            }
        }
        for (int i=0;i<orlderid2021.size();i++){
            ArrayList<Order> orders1 = new ArrayList<>();
            orders1 = orderMapper.getnum(orlderid2021.get(i));
            for (int m=0;m<orders1.size();m++){
                Order orderone = new Order();
                orderone = orders1.get(m);
                orders21.add(orderone);
            }
        }
        for (int i=0;i<orders21.size();i++){
            Order orderone =new Order();
            Float cloprice;
            Integer num;
            orderone = orders21.get(i);
            num = orderone.getQuantity();
            cloprice = clothesMapper.getcloprice(orderone.getClothing_ID());
            cost2021 =cost2021 + num*cloprice;
        }
        cost.add(cost2021);
        return cost;
    }



    public ArrayList<Integer> getsellnumquerter(String usertel){
        ArrayList<Integer> num = new ArrayList<>();
        ArrayList<Orderthing> orderthingsone = new ArrayList<>();
        ArrayList<Orderthing> orderthingstwo = new ArrayList<>();
        ArrayList<Orderthing> orderthingsthree = new ArrayList<>();
        ArrayList<Orderthing> orderthingsfour = new ArrayList<>();
        ArrayList<Order> ordersone = new ArrayList<>();
        ArrayList<Order> orderstwo = new ArrayList<>();
        ArrayList<Order> ordersthree = new ArrayList<>();
        ArrayList<Order> ordersfour = new ArrayList<>();
        ArrayList<String> orlderidsone = new ArrayList<>();
        ArrayList<String> orlderidstwo = new ArrayList<>();
        ArrayList<String> orlderidsthree = new ArrayList<>();
        ArrayList<String> orlderidsfour = new ArrayList<>();
        orderthingsone = orderthingMapper.getorione();
        for (int i=0;i<orderthingsone.size();i++){
            Orderthing orderthingone = new Orderthing();
            orderthingone = orderthingsone.get(i);
            if(orderthingone.getUsertel().equals(usertel)){
                orlderidsone.add(orderthingone.getID());
            }
        }
        for (int i=0;i<orlderidsone.size();i++){
            ArrayList<Order> orders1 = new ArrayList<>();
            orders1 = orderMapper.getnum(orlderidsone.get(i));
            for (int m=0;m<orders1.size();m++){
                Order orderone = new Order();
                orderone = orders1.get(m);
                ordersone.add(orderone);
            }
        }
        num.add(ordersone.size());
        orderthingstwo = orderthingMapper.getoritwo();
        for (int i=0;i<orderthingstwo.size();i++){
            Orderthing orderthingone = new Orderthing();
            orderthingone = orderthingstwo.get(i);
            if(orderthingone.getUsertel().equals(usertel)){
                orlderidstwo.add(orderthingone.getID());
            }
        }
        for (int i=0;i<orlderidstwo.size();i++){
            ArrayList<Order> orders1 = new ArrayList<>();
            orders1 = orderMapper.getnum(orlderidstwo.get(i));
            for (int m=0;m<orders1.size();m++){
                Order orderone = new Order();
                orderone = orders1.get(m);
                orderstwo.add(orderone);
            }
        }
        num.add(orderstwo.size());
        orderthingsthree = orderthingMapper.getorithree();
        for (int i=0;i<orderthingsthree.size();i++){
            Orderthing orderthingone = new Orderthing();
            orderthingone = orderthingsthree.get(i);
            if(orderthingone.getUsertel().equals(usertel)){
                orlderidsthree.add(orderthingone.getID());
            }
        }
        for (int i=0;i<orlderidsthree.size();i++){
            ArrayList<Order> orders1 = new ArrayList<>();
            orders1 = orderMapper.getnum(orlderidsthree.get(i));
            for (int m=0;m<orders1.size();m++){
                Order orderone = new Order();
                orderone = orders1.get(m);
                ordersthree.add(orderone);
            }
        }
        num.add(ordersthree.size());
        orderthingsfour = orderthingMapper.getorifour();
        for (int i=0;i<orderthingsfour.size();i++){
            Orderthing orderthingone = new Orderthing();
            orderthingone = orderthingsfour.get(i);
            if(orderthingone.getUsertel().equals(usertel)){
                orlderidsfour.add(orderthingone.getID());
            }
        }
        for (int i=0;i<orlderidsfour.size();i++){
            ArrayList<Order> orders1 = new ArrayList<>();
            orders1 = orderMapper.getnum(orlderidsfour.get(i));
            for (int m=0;m<orders1.size();m++){
                Order orderone = new Order();
                orderone = orders1.get(m);
                ordersfour.add(orderone);
            }
        }
        num.add(ordersfour.size());
        return num;
    }



    public ArrayList<Integer> getsellnumyear(String usertel){
        ArrayList<Integer> num = new ArrayList<>();
        ArrayList<Orderthing> orderthings2016 = new ArrayList<>();
        ArrayList<Orderthing> orderthings2017 = new ArrayList<>();
        ArrayList<Orderthing> orderthings2018 = new ArrayList<>();
        ArrayList<Orderthing> orderthings2019 = new ArrayList<>();
        ArrayList<Orderthing> orderthings2020 = new ArrayList<>();
        ArrayList<Orderthing> orderthings2021 = new ArrayList<>();
        ArrayList<Order> orders16 = new ArrayList<>();
        ArrayList<Order> orders17 = new ArrayList<>();
        ArrayList<Order> orders18 = new ArrayList<>();
        ArrayList<Order> orders19 = new ArrayList<>();
        ArrayList<Order> orders20 = new ArrayList<>();
        ArrayList<Order> orders21 = new ArrayList<>();
        ArrayList<String> orlderid2016 = new ArrayList<>();
        ArrayList<String> orlderid2017 = new ArrayList<>();
        ArrayList<String> orlderid2018 = new ArrayList<>();
        ArrayList<String> orlderid2019 = new ArrayList<>();
        ArrayList<String> orlderid2020 = new ArrayList<>();
        ArrayList<String> orlderid2021 = new ArrayList<>();
        orderthings2016 = orderthingMapper.getori2016();
        for (int i=0;i<orderthings2016.size();i++){
            Orderthing orderthingone = new Orderthing();
            orderthingone = orderthings2016.get(i);
            if(orderthingone.getUsertel().equals(usertel)){
                orlderid2016.add(orderthingone.getID());
            }
        }
        for (int i=0;i<orlderid2016.size();i++){
            ArrayList<Order> orders1 = new ArrayList<>();
            orders1 = orderMapper.getnum(orlderid2016.get(i));
            for (int m=0;m<orders1.size();m++){
                Order orderone = new Order();
                orderone = orders1.get(m);
                orders16.add(orderone);
            }
        }
        num.add(orders16.size());
        orderthings2017 = orderthingMapper.getori2017();
        for (int i=0;i<orderthings2017.size();i++){
            Orderthing orderthingone = new Orderthing();
            orderthingone = orderthings2017.get(i);
            if(orderthingone.getUsertel().equals(usertel)){
                orlderid2017.add(orderthingone.getID());
            }
        }
        for (int i=0;i<orlderid2017.size();i++){
            ArrayList<Order> orders1 = new ArrayList<>();
            orders1 = orderMapper.getnum(orlderid2017.get(i));
            for (int m=0;m<orders1.size();m++){
                Order orderone = new Order();
                orderone = orders1.get(m);
                orders17.add(orderone);
            }
        }
        num.add(orders17.size());
        orderthings2018 = orderthingMapper.getori2018();
        for (int i=0;i<orderthings2018.size();i++){
            Orderthing orderthingone = new Orderthing();
            orderthingone = orderthings2018.get(i);
            if(orderthingone.getUsertel().equals(usertel)){
                orlderid2018.add(orderthingone.getID());
            }
        }
        for (int i=0;i<orlderid2018.size();i++){
            ArrayList<Order> orders1 = new ArrayList<>();
            orders1 = orderMapper.getnum(orlderid2018.get(i));
            for (int m=0;m<orders1.size();m++){
                Order orderone = new Order();
                orderone = orders1.get(m);
                orders18.add(orderone);
            }
        }
        num.add(orders18.size());
        orderthings2019 = orderthingMapper.getori2019();
        for (int i=0;i<orderthings2019.size();i++){
            Orderthing orderthingone = new Orderthing();
            orderthingone = orderthings2019.get(i);
            if(orderthingone.getUsertel().equals(usertel)){
                orlderid2019.add(orderthingone.getID());
            }
        }
        for (int i=0;i<orlderid2019.size();i++){
            ArrayList<Order> orders1 = new ArrayList<>();
            orders1 = orderMapper.getnum(orlderid2019.get(i));
            for (int m=0;m<orders1.size();m++){
                Order orderone = new Order();
                orderone = orders1.get(m);
                orders19.add(orderone);
            }
        }
        num.add(orders19.size());
        orderthings2020 = orderthingMapper.getori2020();
        for (int i=0;i<orderthings2020.size();i++){
            Orderthing orderthingone = new Orderthing();
            orderthingone = orderthings2020.get(i);
            if(orderthingone.getUsertel().equals(usertel)){
                orlderid2020.add(orderthingone.getID());
            }
        }
        for (int i=0;i<orlderid2020.size();i++){
            ArrayList<Order> orders1 = new ArrayList<>();
            orders1 = orderMapper.getnum(orlderid2020.get(i));
            for (int m=0;m<orders1.size();m++){
                Order orderone = new Order();
                orderone = orders1.get(m);
                orders20.add(orderone);
            }
        }
        num.add(orders20.size());
        orderthings2021 = orderthingMapper.getori2021();
        for (int i=0;i<orderthings2021.size();i++){
            Orderthing orderthingone = new Orderthing();
            orderthingone = orderthings2021.get(i);
            if(orderthingone.getUsertel().equals(usertel)){
                orlderid2021.add(orderthingone.getID());
            }
        }
        for (int i=0;i<orlderid2021.size();i++){
            ArrayList<Order> orders1 = new ArrayList<>();
            orders1 = orderMapper.getnum(orlderid2021.get(i));
            for (int m=0;m<orders1.size();m++){
                Order orderone = new Order();
                orderone = orders1.get(m);
                orders21.add(orderone);
            }
        }
        num.add(orders21.size());
        return num;
    }





    public ArrayList<Map<String,ArrayList<SellcloTynum>>> getSellcloTynum(String usertel){
        ArrayList<Map<String,ArrayList<SellcloTynum>>> analysedata = new ArrayList<>();
        Map<String,ArrayList<SellcloTynum>> map = new HashMap<>();
        ArrayList<SellcloTynum> sellcloTynums = new ArrayList<>();
        ArrayList<String> allCloID = new ArrayList<>();
        ArrayList<Order> orders = new ArrayList<>();
        ArrayList<String> ordid = new ArrayList<>();
        int typenum;
        int j;
        ordid = orderMapper.getoridbyustel(usertel);  //得到所有orderID
        for (int i=0;i<ordid.size();i++){
            ArrayList<Order> order = new ArrayList<>();
            order = orderMapper.getnum(ordid.get(i));       //得到一个orderID对应的orderList
            for (int m=0;m<order.size();m++){
                Order orderone = new Order();
                orderone = order.get(m);                    //得到当下的orderList
                orders.add(orderone);                       //将当下的orderList压进最终orders中
            }
        }
        for (int i=0;i<orders.size();i++){
            String cloidone = new String();
            cloidone = orders.get(i).getClothing_ID();      //得到所有的clothesID
            allCloID.add(cloidone);
        }
        for (int i=0;i<allCloID.size();i++){
            SellcloTynum sellcloTynum = new SellcloTynum();
            String clotype = new String();
            Order orderone = new Order();
            orderone = orders.get(i);       //得到当下的orderList
            clotype = clothesMapper.getclafition(allCloID.get(i));      //得到当下的服装类型
            typenum = orderone.getQuantity();           //得到当下订单对应该服装ID的该服装类型的销量
            switch (clotype){
                case "裤子":
                    sellcloTynum.setName("裤子");
                    sellcloTynum.setValue(typenum);
                    break;
                case "套衫":
                    sellcloTynum.setName("套衫");
                    sellcloTynum.setValue(typenum);
                    break;
                case "连衣裙":
                    sellcloTynum.setName("连衣裙");
                    sellcloTynum.setValue(typenum);
                    break;
                case "外套":
                    sellcloTynum.setName("外套");
                    sellcloTynum.setValue(typenum);
                    break;
                case "凉鞋":
                    sellcloTynum.setName("凉鞋");
                    sellcloTynum.setValue(typenum);
                    break;
                case "衬衫":
                    sellcloTynum.setName("衬衫");
                    sellcloTynum.setValue(typenum);
                    break;
                case "短袖":
                    sellcloTynum.setName("短袖");
                    sellcloTynum.setValue(typenum);
                    break;
                case "运动鞋":
                    sellcloTynum.setName("运动鞋");
                    sellcloTynum.setValue(typenum);
                    break;
                case "包":
                    sellcloTynum.setName("包");
                    sellcloTynum.setValue(typenum);
                    break;
                case "短靴":
                    sellcloTynum.setName("短靴");
                    sellcloTynum.setValue(typenum);
                    break;
            }
            for (j=0;j<sellcloTynums.size();j++){
                SellcloTynum test1 =new SellcloTynum();
                test1=sellcloTynums.get(j);
                test1.getName();
                if (clotype.equals(test1.getName())){
                    sellcloTynum.setValue(typenum+test1.getValue());
                    sellcloTynums.set(j,sellcloTynum);
                    break;
                }
            }
            if (j==sellcloTynums.size()){
                sellcloTynums.add(sellcloTynum);
            }
        }
        map.put("data",sellcloTynums);
        analysedata.add(map);
        return analysedata;
    }

}
