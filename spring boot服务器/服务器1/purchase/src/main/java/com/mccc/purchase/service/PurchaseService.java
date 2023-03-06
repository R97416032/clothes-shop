package com.mccc.purchase.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.mccc.purchase.mapper.ClothingMapper;
import com.mccc.purchase.mapper.OrderMapper;
import com.mccc.purchase.pojo.CartPojo;
import com.mccc.purchase.pojo.ClothingPojo;
import com.mccc.purchase.pojo.OrderListPojo;
import com.mccc.purchase.pojo.OrderPojo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Service
public class PurchaseService {
    @Autowired
    private ClothingMapper clothingMapper;
    @Autowired
    private OrderMapper orderMapper;

    public String byteToBase64(byte [] img){
        return new String(Base64.getEncoder().encode(img));
    }

    public ArrayList<ClothingPojo> getClothes(String name){
        ArrayList<ClothingPojo> clothes = clothingMapper.getClothes(name);
        for (int i=0;i<clothes.size();i++){
            clothes.get(i).setBase64(byteToBase64(clothes.get(i).getImg()));
        }
        return clothes;
    }

    public ArrayList<ClothingPojo> getTheClothes(String name){
        ArrayList<ClothingPojo> clothes = clothingMapper.getTheClothes(name);
        for (int i=0;i<clothes.size();i++){
            clothes.get(i).setBase64(byteToBase64(clothes.get(i).getImg()));
        }
        return clothes;
    }

    public JSONObject loadSkuInfo(String name){
        JSONObject result = new JSONObject();//数据结果
        ArrayList<JSONObject> sku_list = new ArrayList<>();//商品对应的sku列表
        ArrayList<JSONObject> spec_list = new ArrayList<>();//商品规格
        ArrayList<ClothingPojo> clothes = clothingMapper.getTheClothes(name);

        sku_list = getSkuList(name);
        spec_list = getSpecList(name);

        result.put("_id","001");
        result.put("name",name);
        result.put("goods_thumb",null);//商品缩略图，暂时为空
        result.put("sku_list",sku_list);
        result.put("spec_list",spec_list);
        return result;
    }

//    配置spec_list参数
    public ArrayList<JSONObject> getSpecList(String name){
        ArrayList<JSONObject> spec_list = new ArrayList<>();//商品规格

        ArrayList<String> colorArray = clothingMapper.getColor(name);
        ArrayList<String> sizeArray = clothingMapper.getSize(name);
        JSONObject temp = new JSONObject();
        temp.put("name","颜色");
        ArrayList<JSONObject> temp1 = new ArrayList<>();
        for (String value : colorArray) {
            JSONObject temp2 = new JSONObject();
            temp2.put("name", value);
            temp1.add(temp2);
        }
        temp.put("list",temp1);
        spec_list.add(temp);
        temp = new JSONObject();
        temp.put("name","尺寸");
        temp1 = new ArrayList<>();
        for (String s : sizeArray) {
            JSONObject temp2 = new JSONObject();
            temp2.put("name", s);
            temp1.add(temp2);
        }
        temp.put("list",temp1);
        spec_list.add(temp);

        return spec_list;
    }
//    配置sku_list参数
    public ArrayList<JSONObject> getSkuList(String name){
        ArrayList<JSONObject> sku_list = new ArrayList<>();//商品对应的sku列表
        ArrayList<String> colorArray = clothingMapper.getColor(name);
        ArrayList<String> sizeArray = clothingMapper.getSize(name);
        int k=0;
        for (String color : colorArray) {
            for (String size : sizeArray) {
                Integer stock = clothingMapper.getStock(name, color, size);
                if (stock != null && stock > 0) {
                    JSONObject temp = new JSONObject();
                    String id = clothingMapper.getID(name, color, size);
                    temp.put("id",id);
                    temp.put("goods_id","001");
                    temp.put("goods_name",name);
                    temp.put("goods_des",clothingMapper.getClothesByID(id).getDes());
                    temp.put("image",byteToBase64(clothingMapper.getClothesByID(id).getImg()));
//                    temp.put("image",null);
                    temp.put("price",clothingMapper.getPrice(name,color,size)*100);
                    ArrayList<String> sku_name_arr = new ArrayList<>();
                    sku_name_arr.add(color);
                    sku_name_arr.add(size);
                    temp.put("sku_name_arr",sku_name_arr);
                    temp.put("stock",stock);
                    sku_list.add(temp);
                }
            }
        }

        return sku_list;
    }

    public void addCart(JSONObject data){
        CartPojo cartPojo = new CartPojo();

        DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        String id = dateFormat.format(new Date());

        cartPojo.setID(id);
        cartPojo.setUsertel(data.getString("usertel"));
        cartPojo.setClothing_ID(data.getString("clothing_ID"));
        cartPojo.setQuantity(data.getString("quantity"));

        orderMapper.addCart(cartPojo);
    }

    public String submitOrder(JSONObject data){
        OrderPojo order = new OrderPojo();
        OrderListPojo orderList = new OrderListPojo();

        DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        String orderID = dateFormat.format(new Date());
        DateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
        String orderTime = dateFormat1.format(new Date());

        order.setID(orderID);
        order.setTime(orderTime);
        order.setAddress(data.getString("address"));
        order.setUsertel(data.getString("usertel"));
        order.setRemarks(data.getString("remarks"));
        order.setType("待付款");

        orderList.setOrder_ID(orderID);
        orderList.setClothing_ID(data.getString("goods_id"));
        orderList.setQuantity(data.getInteger("quantity"));
        orderList.setAmount(data.getFloat("amount"));
        orderList.setClassification(orderMapper.getClassification(data.getString("goods_id")));

        orderMapper.submitOrder(order);
        orderMapper.insertOrderList(orderList);

        return orderID;
    }

    public void payOrder(JSONObject data) {
        OrderPojo payOrder = new OrderPojo();

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
        String paytime = dateFormat.format(new Date());

        payOrder.setID(data.getString("id"));
        payOrder.setPayment(data.getString("payment"));
        payOrder.setPaytime(paytime);
        payOrder.setType("未发货");

        orderMapper.payOrder(payOrder);

        ArrayList<OrderListPojo> orderList = orderMapper.getOrderListById(data.getString("id"));
        for (OrderListPojo item: orderList) {
            clothingMapper.updateStock(clothingMapper.getStockById(item.getClothing_ID())-item.getQuantity(),item.getClothing_ID());
        }
    }

    public ArrayList<JSONObject> getCartList(String usertel) {
        ArrayList<JSONObject> result = new ArrayList<>();
        ArrayList<CartPojo> cartList = orderMapper.getCartListByTel(usertel);
        for(CartPojo item:cartList){
            ClothingPojo clothing = new ClothingPojo();
            clothing = clothingMapper.getClothesByID(item.getClothing_ID());
            JSONObject resultItem = new JSONObject();
            resultItem.put("check",0);
            resultItem.put("id",item.getID());
            resultItem.put("img",byteToBase64(clothing.getImg()));
            resultItem.put("name",clothing.getName());
            resultItem.put("des",clothing.getDes());
            resultItem.put("color",clothing.getColor());
            resultItem.put("size",clothing.getSize());
            resultItem.put("price",clothing.getPrice());
            resultItem.put("num",item.getQuantity());
            result.add(resultItem);
        }
        return result;
    }

    public void cartListDel(List<String> ids){
        for (String id: ids) {
            orderMapper.delCartById(id);
        }
    }

    public String submitCartOrder(JSONObject data){

        OrderPojo order = new OrderPojo();

        DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        String orderID = dateFormat.format(new Date());
        DateFormat dateFormat1 = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
        String orderTime = dateFormat1.format(new Date());

        order.setID(orderID);
        order.setTime(orderTime);
        order.setAddress(data.getString("address"));
        order.setUsertel(data.getString("usertel"));
        order.setRemarks(data.getString("remarks"));
        order.setType("待付款");
        orderMapper.submitOrder(order);

        List<JSONObject> clothes = JSONArray.parseArray(data.getJSONArray("clothes").toJSONString(), JSONObject.class);
        List<String> cartIds = new ArrayList<>();
        for (JSONObject item : clothes){
            cartIds.add(item.getString("id"));

            OrderListPojo orderList = new OrderListPojo();
            orderList.setOrder_ID(orderID);

            String clothing_id = clothingMapper.getID(item.getString("name"),item.getString("color"),item.getString("size"));

            orderList.setClothing_ID(clothing_id);
            orderList.setQuantity(item.getInteger("num"));
            orderList.setAmount(item.getInteger("num")*item.getFloat("price"));
            orderList.setClassification(orderMapper.getClassification(clothing_id));
            orderMapper.insertOrderList(orderList);
        }

        cartListDel(cartIds);

        return orderID;
    }

}
