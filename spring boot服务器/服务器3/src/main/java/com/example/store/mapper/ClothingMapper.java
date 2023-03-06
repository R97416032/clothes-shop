package com.example.store.mapper;

import com.example.store.entity.Clothing;
import org.apache.ibatis.annotations.*;

import java.util.ArrayList;

@Mapper
public interface ClothingMapper {
    @Select("select num,id,name,des,classification,color,size,stock,sale,price,keywords,img from clothing")
    ArrayList<Clothing> findAllCloth();
    @Select("select * from clothing where classification like #{classification}")
    ArrayList<Clothing> findAllByClass(Clothing clothing);
    @Select("select * from clothing where name like #{name}")
    ArrayList<Clothing> findAllBynName(Clothing clothing);
    @Delete("Delete from clothing where ID = #{id}")
    int delById(Clothing clothing);
    @Select("select * from clothing where ID = #{id}")
    Clothing insertCheck(Clothing clothing);
    @Insert("insert into clothing(ID,classification,name,color,size,stock,sale,price,des,keywords) values (#{id},#{classification},#{name},#{color},#{size},#{stock},#{sale},#{price},#{des},#{keywords})")
    @Options(useGeneratedKeys = true,keyColumn = "id", keyProperty = "id")
    int insertCloth(Clothing clothing);
    @Update("update clothing set classification=#{classification},name=#{name},color=#{color},size=#{size}," +
            "stock=#{stock},sale=#{sale},price=#{price},des=#{des},keywords=#{keywords}  where ID = #{id}")
    int updateCloth(Clothing clothing);
}
