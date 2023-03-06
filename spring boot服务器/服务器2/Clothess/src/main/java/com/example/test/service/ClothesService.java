package com.example.test.service;

import com.example.test.entity.Clothes;
import com.example.test.entity.Orderthing;
import com.example.test.entity.User;
import com.example.test.mapper.ClothesMapper;
import com.example.test.mapper.OrderMapper;
import com.example.test.mapper.OrderthingMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.lang.reflect.Array;
import java.util.*;

@Service
public class ClothesService {

    @Autowired
    private ClothesMapper clothesMapper;

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private OrderthingMapper orderthingMapper;


    public ArrayList<Clothes> getclothes( Map map){
        ArrayList<String> clothes_IDs = (ArrayList<String>) map.get("clothing_ID");
        ArrayList<Clothes> clothes = new ArrayList<Clothes>();
        Clothes oneClothes = new Clothes();
        for (int i=0;i<clothes_IDs.size();i++){
             oneClothes = clothesMapper.getclothes(clothes_IDs.get(i));
             clothes.add(oneClothes);
        }
        if (clothes !=null)
            return clothes;
        else {
            return null;
        }
    }

    public ArrayList<Map<String,ArrayList<Clothes>>> getorlclothes(String usertel){
        ArrayList<Map<String,ArrayList<Clothes>>> orlorlclothes = new ArrayList<Map<String,ArrayList<Clothes>>>();
        ArrayList<String> orderID = new ArrayList<String>();
        orderID = orderMapper.getoridbyustel(usertel);
        ArrayList<String> clothesID = new ArrayList<String>();
        Clothes clothesone = new Clothes();
        for (int i=0;i<orderID.size();i++) {
            Map<String,ArrayList<Clothes>> order = new HashMap<String,ArrayList<Clothes>>();
            ArrayList<Clothes> clothes = new ArrayList<Clothes>();
            clothesID=orderMapper.getclothesID(orderID.get(i));
            byte[] img=null;
            String res=null;
            for (int j=0;j<clothesID.size();j++) {
                clothesone = clothesMapper.getclothes(clothesID.get(j));
                img=clothesone.getImg();
                res=new String(Base64.getEncoder().encode(img));
                clothesone.setBase64(res);
                clothes.add(clothesone);
            }
            order.put(orderID.get(i),clothes);
            orlorlclothes.add(order);
        }
        return orlorlclothes;
    }







    public ArrayList<Map<String,ArrayList<Clothes>>> getoridbydata(String datamin,String datamax,String usertel){
        ArrayList<Map<String,ArrayList<Clothes>>> orlorlclothes = new ArrayList<Map<String,ArrayList<Clothes>>>();
        ArrayList<String> orderID = new ArrayList<String>();
        orderID = orderthingMapper.getoridbydata(datamin,datamax,usertel);
        ArrayList<String> clothesID = new ArrayList<String>();
        Clothes clothesone = new Clothes();
        for (int i=0;i<orderID.size();i++) {
            Map<String,ArrayList<Clothes>> order = new HashMap<String,ArrayList<Clothes>>();
            ArrayList<Clothes> clothes = new ArrayList<Clothes>();
            clothesID=orderMapper.getclothesID(orderID.get(i));
            for (int j=0;j<clothesID.size();j++) {
                clothesone = clothesMapper.getclothes(clothesID.get(j));
                clothes.add(clothesone);
            }
            order.put(orderID.get(i),clothes);
            orlorlclothes.add(order);
        }
        return orlorlclothes;
    }


    public ArrayList<Map<String,ArrayList<Clothes>>> getclothesbytype(String type,String usertel){
        ArrayList<Map<String,ArrayList<Clothes>>> orlorlclothes = new ArrayList<Map<String,ArrayList<Clothes>>>();
        ArrayList<String> orderID = new ArrayList<String>();
        orderID = orderMapper.getoridbytype(type,usertel);
        ArrayList<String> clothesID = new ArrayList<String>();
        Clothes clothesone = new Clothes();
        for (int i=0;i<orderID.size();i++) {
            Map<String,ArrayList<Clothes>> order = new HashMap<String,ArrayList<Clothes>>();
            ArrayList<Clothes> clothes = new ArrayList<Clothes>();
            clothesID=orderMapper.getclothesID(orderID.get(i));
            for (int j=0;j<clothesID.size();j++) {
                clothesone = clothesMapper.getclothes(clothesID.get(j));
                clothes.add(clothesone);
            }
            order.put(orderID.get(i),clothes);
            orlorlclothes.add(order);
        }
        return orlorlclothes;
    }

    public ArrayList<Map<String,ArrayList<Clothes>>> getclothesbyname(String name){
        ArrayList<Map<String,ArrayList<Clothes>>> orlorlclothes = new ArrayList<Map<String,ArrayList<Clothes>>>();
        ArrayList<String> orderID = new ArrayList<String>();
        ArrayList<String> ID = clothesMapper.getIDbyname(name);
        for (int i=0;i<ID.size();i++){
            ArrayList<String> orderID2 = new ArrayList<String>();
            for (int j=0;j<orderMapper.getorderIDbyclothing_ID(ID.get(i)).size();j++){
                orderID2=orderMapper.getorderIDbyclothing_ID(ID.get(i));
                orderID.add(i,orderID2.get(i+j));
            }

        }
        ArrayList<String> clothesID = new ArrayList<String>();
        Clothes clothesone = new Clothes();
        for (int i=0;i<orderID.size();i++) {
            Map<String,ArrayList<Clothes>> order = new HashMap<String,ArrayList<Clothes>>();
            ArrayList<Clothes> clothes = new ArrayList<Clothes>();
            clothesID=orderMapper.getclothesID(orderID.get(i));
            for (int j=0;j<clothesID.size();j++) {
                clothesone = clothesMapper.getclothes(clothesID.get(j));
                clothes.add(clothesone);
            }
            order.put(orderID.get(i),clothes);
            orlorlclothes.add(order);
        }
        return orlorlclothes;
    }

}
