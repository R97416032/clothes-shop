package com.mccc.purchase;

import com.alibaba.fastjson.JSONObject;
import com.mccc.purchase.pojo.TestPojo;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;

public class Test {
    public static void main(String[] args) {

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
        String orderNo = dateFormat.format(new Date());
        System.out.println("时间戳是"+orderNo);

    }
}
