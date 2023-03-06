package com.mccc.purchase.pojo;

import lombok.Data;

@Data
public class OrderPojo {
    String ID;
    String time;
    String payment;
    String address;
    String usertel;
    String remarks;
    String paytime;
    String delivery_time;
    String delivery_num;
    String type;
}
