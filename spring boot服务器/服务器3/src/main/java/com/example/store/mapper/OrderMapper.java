package com.example.store.mapper;

import com.example.store.entity.order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.ArrayList;

@Mapper
public interface OrderMapper {
    @Select("select * from `order` where type=#{type}")
    ArrayList<order> orders(String type);
    @Update("update `order` set type='待收货' ,delivery_num=#{delivery_num} ,delivery_time=#{delivery_time} where id=#{id}")
    int updateDelivery(String id, String delivery_num,String delivery_time);
}
