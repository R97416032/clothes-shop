package com.example.store.mapper;

import com.example.store.entity.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.ArrayList;

@Mapper
public interface ChartMapper {
    @Select("SELECT classification name,SUM(quantity) value FROM `order_list` GROUP  BY classification")
    ArrayList<class_quantity>getCQ();
    @Select("SELECT classification name,SUM(amount) value FROM `order_list` GROUP  BY classification")
    ArrayList<class_amount> getCA();
}
