package com.example.test.mapper;

import com.example.test.entity.Order;
import com.example.test.entity.Orderthing;
import org.apache.ibatis.annotations.*;

import java.util.ArrayList;

@Mapper
public interface OrderthingMapper {

    @Select("select * from `order` where usertel = #{usertel}")
    ArrayList<Orderthing> getOrderthing(String usertel);

    @Select("select * from `order` where ID = #{order_ID}")
    Orderthing getorderthingbyid(String order_ID);

    @Update("update `order` set type='已收货' where ID=#{order_ID}")
    int getuptypeorder(String order_ID);

    @Update("update `order` set type='未发货', payment= #{payment} where ID=#{order_ID}")
    int getpayorder(@Param("order_ID") String order_ID,@Param("payment") String payment);

    @Delete("delete from `order` where ID=#{order_ID}")
    int deleteorder(String order_ID);

    @Select("select ID from `order` where time BETWEEN CAST(#{datamin} AS DATETIME ) AND CAST(#{datamax} AS DATETIME) &&usertel=#{usertel}")
    ArrayList<String> getoridbydata(@Param("datamin") String datamin,@Param("datamax") String datamax,@Param("usertel") String usertel);


    @Select("select * from `order` where time BETWEEN CAST('2016-01-01' AS DATETIME ) AND CAST('2016-12-31' AS DATETIME)")
    ArrayList<Orderthing> getori2016();
    @Select("select * from `order` where time BETWEEN CAST('2017-01-01' AS DATETIME ) AND CAST('2017-12-31' AS DATETIME)")
    ArrayList<Orderthing> getori2017();
    @Select("select * from `order` where time BETWEEN CAST('2018-01-01' AS DATETIME ) AND CAST('2018-12-31' AS DATETIME)")
    ArrayList<Orderthing> getori2018();
    @Select("select * from `order` where time BETWEEN CAST('2019-01-01' AS DATETIME ) AND CAST('2019-12-31' AS DATETIME)")
    ArrayList<Orderthing> getori2019();
    @Select("select * from `order` where time BETWEEN CAST('2020-01-01' AS DATETIME ) AND CAST('2020-12-31' AS DATETIME)")
    ArrayList<Orderthing> getori2020();
    @Select("select * from `order` where time BETWEEN CAST('2021-01-01' AS DATETIME ) AND CAST('2021-12-31' AS DATETIME)")
    ArrayList<Orderthing> getori2021();

    @Select("select * from `order` where time BETWEEN CAST('2021-01-01' AS DATETIME ) AND CAST('2021-03-31' AS DATETIME)")
    ArrayList<Orderthing> getorione();
    @Select("select * from `order` where time BETWEEN CAST('2021-04-01' AS DATETIME ) AND CAST('2021-06-30' AS DATETIME)")
    ArrayList<Orderthing> getoritwo();
    @Select("select * from `order` where time BETWEEN CAST('2021-07-01' AS DATETIME ) AND CAST('2021-09-30' AS DATETIME)")
    ArrayList<Orderthing> getorithree();
    @Select("select * from `order` where time BETWEEN CAST('2021-10-01' AS DATETIME ) AND CAST('2021-12-31' AS DATETIME)")
    ArrayList<Orderthing> getorifour();

    @Select("select * from `order` where ID = #{ID}")
    Orderthing getOrderone(String order_ID);

}
