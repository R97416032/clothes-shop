package com.example.store.service;

import com.example.store.entity.Img;
import com.example.store.mapper.PicMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Blob;

@Service
public class PicService {
    @Autowired
    private PicMapper picMapper;
    public int updatePic(byte[] img,String id){
        return picMapper.updatePic(img,id);
    };
    public Img getPic(String id){
        return picMapper.getPic(id); }}
