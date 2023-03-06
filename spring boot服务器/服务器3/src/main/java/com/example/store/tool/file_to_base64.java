package com.example.store.tool;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Base64;
public class file_to_base64 {
    public String filetobase64(File file){
        String result=null;
        try { InputStream in = new FileInputStream(file);
            int len = -1;
            byte[] buffer = new byte[1024];
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            while ((len = in.read(buffer)) != -1) {
                out.write(buffer, 0, len);}
            // ByteArrayOutputStream编码成base64字符串
            result = new String(Base64.getEncoder().encode(out.toByteArray()));
            in.close(); } catch (Exception e) {
            e.printStackTrace(); }
        return result; }}
