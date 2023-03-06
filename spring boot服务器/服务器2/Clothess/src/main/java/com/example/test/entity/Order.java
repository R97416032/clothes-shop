package com.example.test.entity;

public class Order {
    private String order_ID;
    private String clothing_ID;
    private Integer quantity;

    public String getOrder_ID() {
        return order_ID;
    }

    public void setOrder_ID(String order_ID) {
        this.order_ID = order_ID;
    }

    public String getClothing_ID() {
        return clothing_ID;
    }

    public void setClothing_ID(String clothing_ID) {
        this.clothing_ID = clothing_ID;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}