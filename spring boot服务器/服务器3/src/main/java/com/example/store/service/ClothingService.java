package com.example.store.service;

import com.example.store.entity.Clothing;
import com.example.store.mapper.ClothingMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 关注公众号：MarkerHub
 * @since 2021-06-07
 */

@Service
public class ClothingService {
   @Autowired
   ClothingMapper clothingMapper;
//查找所有服装
   public ArrayList<Clothing> findAllclo(){
      return clothingMapper.findAllCloth();
   }
//   根据类别查找
    public ArrayList<Clothing> findAllbyclass(Clothing clothing){
        String class1=clothing.getClassification();
        class1="%%"+class1+"%%";
        clothing.setClassification(class1);
        System.out.println("根据类别查找的衣服如下");
        System.out.println(clothingMapper.findAllByClass(clothing));
        return clothingMapper.findAllByClass(clothing);
    }
//    根据名称查找
    public ArrayList<Clothing> findAllByName(Clothing clothing){
        String name=clothing.getName();
        name="%%"+name+"%%";
        clothing.setName(name);
       return clothingMapper.findAllBynName(clothing);
    }
//    根据ID删除服装,删除成功返回400，否则返回200
    public int delById(Clothing clothing){
       int i= clothingMapper.delById(clothing);
       if (i!=0) return 400;
            else return 200;
   }
//插入服装信息,400成功，300和200 失败，其中300插入失败，200表示插入数据已存在
    public Integer insertclo (Clothing clothing){
       int m=0;
       Clothing clothing1=clothingMapper.insertCheck(clothing);
       if (clothing1!=null){
           return 200;
       }
       else {
           m=clothingMapper.insertCloth(clothing);
           if (m==0)
               return 300;
           else return 400;
       }
    }
//    更改服装信息 成功返回400，否则200
    public Integer updateclo(Clothing clothing){
       int i=clothingMapper.updateCloth(clothing);
       if(i==0)
           return 200;
       else
           return 400;
    }
}
