package com.mccc.purchase.mapper;

import com.mccc.purchase.pojo.CartPojo;
import com.mccc.purchase.pojo.ClothingPojo;
import com.mccc.purchase.pojo.OrderListPojo;
import com.mccc.purchase.pojo.OrderPojo;
import org.apache.ibatis.annotations.*;

import java.util.ArrayList;

@Mapper
public interface OrderMapper {

    @Insert("insert into `cart` (ID,usertel,clothing_ID,quantity) values (#{ID},#{usertel},#{clothing_ID},#{quantity})")
    void addCart(CartPojo cartPojo);

    @Insert("insert into `order` (ID,time,address,usertel,remarks,type) values (#{ID},#{time},#{address},#{usertel},#{remarks},#{type})")
    void submitOrder(OrderPojo order);

    @Update("update `order` set payment = #{payment},paytime = #{paytime},type = #{type} where ID = #{ID}")
    void payOrder(OrderPojo payOrder);

    @Select("select classification from clothing where ID = #{id}")
    String getClassification(String id);

    @Insert("INSERT INTO `order_list`(order_ID,clothing_ID,quantity,amount,classification) VALUES (#{order_ID},#{clothing_ID},#{quantity},#{amount},#{classification})")
    void insertOrderList(OrderListPojo order);

    @Select("select * from cart where usertel=#{usertel}")
    ArrayList<CartPojo> getCartListByTel(String usertel);

    @Delete("Delete from cart where ID=#{ID}")
    void delCartById(String ID);

    @Select("select * from order_list where order_ID =#{order_ID}")
    ArrayList<OrderListPojo> getOrderListById(String order_ID);
}
