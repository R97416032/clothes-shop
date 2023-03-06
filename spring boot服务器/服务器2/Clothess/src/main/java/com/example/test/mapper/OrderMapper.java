package com.example.test.mapper;

import com.example.test.entity.Order;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Param;
import java.util.ArrayList;

@Mapper
public interface OrderMapper {

    @Select("select * from `order_list` where order_ID = #{order_ID}")
    Order getOrder(String order_ID);

    @Select("select clothing_ID from `order_list` where order_ID = #{order_ID}")
    ArrayList<String> getclothesID(String order_ID);

    @Select("select order_ID from `order_list` where clothing_ID = #{clothing_ID}")
    ArrayList<String> getorderIDbyclothing_ID(String clothing_ID);

    @Select("select ID from `order` where usertel = #{usertel}")
    ArrayList<String> getoridbyustel(String usertel);

    @Select("select ID from `order` where type =#{type} and usertel = #{usertel}")
    ArrayList<String> getoridbytype(@Param("type") String type,@Param("usertel") String usertel);

    @Select("select clothing_ID from `order_list`")
    ArrayList<String> getallclothesID();

    @Select("select * from `order_list` where order_ID = #{order_ID}")
    ArrayList<Order> getnum(String order_ID);

    @Delete("delete from `order_list` where order_ID=#{order_ID}")
    int deleteorder_list(String order_ID);

}
