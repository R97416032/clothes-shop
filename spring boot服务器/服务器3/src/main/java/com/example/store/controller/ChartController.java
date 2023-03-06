package com.example.store.controller;

import com.example.store.entity.*;
import com.example.store.service.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;

@Controller
@ResponseBody
@RequestMapping("/chart")
public class ChartController {
    @Autowired
    private ChartService chartService;
    @RequestMapping("getCQ")
    ArrayList<class_quantity> getClass_Quantity(){
        return chartService.getAll_CQ();
    }
    @RequestMapping("getCA")
    ArrayList<class_amount> getClass_Amount(){
        return chartService.getAll_CA();
    }
}
