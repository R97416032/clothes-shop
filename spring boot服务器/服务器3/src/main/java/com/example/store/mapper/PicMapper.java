package com.example.store.mapper;

import com.example.store.entity.Img;
import org.apache.ibatis.annotations.*;

import java.sql.Blob;

@Mapper
public interface PicMapper {
    @Update("update clothing set img=#{img} where ID=#{id}")
    int updatePic(byte[] img,String id);
    @Select("select img from clothing where ID='123'")
    Img getPic(@Param("id") String id);
}
