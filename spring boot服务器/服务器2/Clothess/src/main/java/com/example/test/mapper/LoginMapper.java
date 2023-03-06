package com.example.test.mapper;

import com.example.test.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface LoginMapper {

    @Select("select * from user where tel = #{tel} and password = #{password}")
    User loginCheck(User user);

    @Select("select * from user where tel = #{tel}")
    User checktel(String tel);

    @Insert("insert into user (root,name,tel,password) values (#{root},#{name},#{tel},#{password})")
    int register(@Param("root") String root,@Param("name") String name,@Param("tel") String tel,@Param("password") String password);

    @Update("update user set name= #{name} , password=#{password}  where tel=#{tel}")
    int updataquery(@Param("name") String name,@Param("password") String password,@Param("tel") String tel);
}
