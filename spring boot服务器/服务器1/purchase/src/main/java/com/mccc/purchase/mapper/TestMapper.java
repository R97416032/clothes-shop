package com.mccc.purchase.mapper;

import com.mccc.purchase.pojo.ClothingPojo;
import com.mccc.purchase.pojo.TestPojo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.ArrayList;

@Mapper
public interface TestMapper {
    @Select("select * from stu")
    ArrayList<TestPojo> getStu();

    @Select("select img from clothing")
    ArrayList<byte[]> findAllClothImg();
}
