package com.example.springbootbackend.service;

import com.azure.storage.blob.*;
import com.azure.storage.blob.models.BlobHttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.UUID;

@Service
public class AzureBlobStorageService {

    private final String connectionString = "DefaultEndpointsProtocol=https;AccountName=oopvisionimages;AccountKey=Wr0v1yXDgucqovsyEGRxh3v/QSI8QB3RC5GFyvQHH2lfVr0qWzoOErguXl6z62w7/+r6xQHzqzxy+AStOSBYyg==;EndpointSuffix=core.windows.net";
    private final String containerName = "images";

    public String uploadFile(MultipartFile file) {
        BlobServiceClient blobServiceClient = new BlobServiceClientBuilder()
                .connectionString(connectionString)
                .buildClient();

        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);
        if (!containerClient.exists()) {
            containerClient.create();
        }

        String blobName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
        BlobClient blobClient = containerClient.getBlobClient(blobName);

        try (InputStream dataStream = file.getInputStream()) {
            blobClient.upload(dataStream, file.getSize(), true);

            BlobHttpHeaders headers = new BlobHttpHeaders().setContentType(file.getContentType());
            blobClient.setHttpHeaders(headers);
        } catch (Exception e) {
            throw new RuntimeException("Error uploading file to Azure Blob Storage", e);
        }

        return blobClient.getBlobUrl();
    }

    public void deleteFile(String blobUrl) {
        BlobServiceClient blobServiceClient = new BlobServiceClientBuilder()
                .connectionString(connectionString)
                .buildClient();

        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);

        String blobName = blobUrl.substring(blobUrl.lastIndexOf("/") + 1);

        BlobClient blobClient = containerClient.getBlobClient(blobName);

        blobClient.delete();
    }

}
