package com.example.test.controller;


import com.example.test.entity.SellcloTynum;
import com.example.test.service.AnalyseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Map;

@RestController
public class AnalyseController {

    @Autowired
    AnalyseService analyseService;

    @GetMapping("/getsellnumyear")
    public ArrayList<Integer> getsellnumyear(String usertel){ return analyseService.getsellnumyear(usertel);}

    @GetMapping("/getsellnumquerter")
    public ArrayList<Integer> getsellnumquerter(String usertel){ return analyseService.getsellnumquerter(usertel);}

    @GetMapping("/getsellcostyear")
    public ArrayList<Float> getsellcostyear(String usertel){ return analyseService.getsellcostyear(usertel);}

    @GetMapping("/getsellcostquerter")
    public ArrayList<Float> getsellcostquerter(String usertel){ return analyseService.getsellcostquerter(usertel);}

    @GetMapping ("/geanalysedata")
    public ArrayList<Map<String,ArrayList<SellcloTynum>>> getSellcloTynum(String usertel){ return analyseService.getSellcloTynum(usertel);}
}
