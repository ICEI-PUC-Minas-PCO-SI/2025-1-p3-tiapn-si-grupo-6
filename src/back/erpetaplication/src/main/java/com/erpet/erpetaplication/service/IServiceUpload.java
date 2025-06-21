package com.erpet.erpetaplication.service;


import org.springframework.web.multipart.MultipartFile;

public interface IServiceUpload {

    public String uploadFile(MultipartFile file);
}
