package com.mccc.purchase.pojo;

import lombok.Data;

@Data
public class ClothingPojo {
    private int num;
    private String ID;
    private String name;
    private String des;
    private String classification;
    private String color;
    private String size;
    private int stock;
    private int sale;
    private float price;
    private byte[] img;
    private String keywords;
    private String base64;
}
