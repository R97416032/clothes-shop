package com.example.test.mapper;

import com.example.test.entity.Clothes;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.lang.reflect.Array;
import java.util.ArrayList;

@Mapper
public interface ClothesMapper {

    @Select("select * from clothing where ID = #{id}")
    Clothes getclothes(String id);

    @Select("select ID from clothing where name like '%${name}%'")
    ArrayList<String> getIDbyname(String name);

    @Select("select classification from clothing where ID = #{clothing_ID}")
    String getclafition(String clothing_ID);


    @Select("select price from clothing where ID = #{clothing_ID}")
    Float getcloprice(String clothing_ID);
}
