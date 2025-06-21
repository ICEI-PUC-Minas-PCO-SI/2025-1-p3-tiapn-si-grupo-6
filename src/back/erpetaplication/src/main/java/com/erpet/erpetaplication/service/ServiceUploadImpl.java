package com.erpet.erpetaplication.service;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class ServiceUploadImpl implements IServiceUpload
{

    @Override
    public String uploadFile(MultipartFile file)
    {
        try
        {
            System.out.println("DEBUG:" + file.getOriginalFilename());
            return file.getOriginalFilename();
        }
        catch(Exception ex)
        {
            System.out.println("DEBUG: " + ex.getMessage());
        }
        return null;
    }

}
