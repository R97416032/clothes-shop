package com.mccc.purchase.pojo;

import lombok.Data;

@Data
public class OrderListPojo {
    String order_ID;
    String clothing_ID;
    int quantity;
    float amount;
    String classification;
}
