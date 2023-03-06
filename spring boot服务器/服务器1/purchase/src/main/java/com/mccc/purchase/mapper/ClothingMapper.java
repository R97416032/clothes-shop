package com.mccc.purchase.mapper;

import com.mccc.purchase.pojo.ClothingPojo;
import com.mccc.purchase.pojo.OrderPojo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.ArrayList;
@Mapper
public interface ClothingMapper {

    @Select("select * from clothing where name like '%${name}%' or classification like '%${name}%' or des like '%${name}%' group by name")
    ArrayList<ClothingPojo> getClothes(String name);

    @Select("select * from clothing where name=#{name}")
    ArrayList<ClothingPojo> getTheClothes(String name);

    @Select("select * from clothing where ID=#{ID}")
    ClothingPojo getClothesByID(String ID);

    @Select("select color from clothing where name=#{name} group by color")
    ArrayList<String> getColor(String name);

    @Select("select size from clothing where name=#{name} group by size")
    ArrayList<String> getSize(String name);

    @Select("select stock from clothing where name=#{arg0} and color=#{arg1} and size=#{arg2}")
    Integer getStock(String name,String color,String size);
    @Select("select stock from clothing where ID=#{ID}")
    Integer getStockById(String ID);


    @Select("select price from clothing where name=#{arg0} and color=#{arg1} and size=#{arg2}")
    float getPrice(String name,String color,String size);

    @Select("select ID from clothing where name=#{arg0} and color=#{arg1} and size=#{arg2}")
    String getID(String name,String color,String size);

    @Update("update `clothing` set stock = #{arg0} where ID = #{arg1}")
    void updateStock(int stock,String ID);
}
