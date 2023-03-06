package com.example.store.mapper;

import com.example.store.entity.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface LoginMapper {
    @Select("select * from user where tel = #{tel} and password = #{password}")
    User loginCheck(User user);
    @Select("select * from user where tel = #{tel}")
    User signupCheck(User user);
    @Insert("insert into user (root,name,tel,password) values (#{root},#{name},#{tel},#{password})")
    @Options(useGeneratedKeys = true,keyColumn = "tel", keyProperty = "tel")
    int signUp(User user);
}
