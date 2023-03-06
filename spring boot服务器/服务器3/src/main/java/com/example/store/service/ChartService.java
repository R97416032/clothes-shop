package com.example.store.service;


import com.example.store.entity.*;
import com.example.store.mapper.ChartMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ChartService {
    @Autowired
    private ChartMapper chart;
    public ArrayList<class_quantity>getAll_CQ(){
        return chart.getCQ();
    };
    public ArrayList<class_amount> getAll_CA() {
        return chart.getCA();
    }
}
