package com.example.springbootbackend.service;

import com.example.springbootbackend.model.Image;
import com.example.springbootbackend.model.Topic;
import com.example.springbootbackend.model.VisualExample;
import com.example.springbootbackend.repository.ImageRepository;
import com.example.springbootbackend.repository.TopicRepository;
import com.example.springbootbackend.repository.VisualExampleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private AzureBlobStorageService azureBlobStorageService;

    @Autowired
    private VisualExampleRepository visualExampleRepository;

    public List<Image> getImagesByExampleId(Integer visualExampleId) {
        return imageRepository.findByVisualExampleId(visualExampleId);
    }

    public Image addImage(Integer visualExampleId, MultipartFile file, Image imageDetails) {
        VisualExample visualExample = visualExampleRepository.findById(visualExampleId)
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        String blobUrl = azureBlobStorageService.uploadFile(file);

        imageDetails.setVisualExampleId(visualExampleId);
        imageDetails.setImagePath(blobUrl);

        return imageRepository.save(imageDetails);
    }

    public Image updateImage(Integer imageId, MultipartFile file, String imageSide, Integer orderIndex) {
        Image existing = imageRepository.findById(Long.valueOf(imageId))
                .orElseThrow(() -> new RuntimeException("Image not found"));

        if (file != null && !file.isEmpty()) {
            azureBlobStorageService.deleteFile(existing.getImagePath());
            String newBlobUrl = azureBlobStorageService.uploadFile(file);
            existing.setImagePath(newBlobUrl);
        }

        if (imageSide != null) {
            existing.setImageSide(imageSide);
        }
        if (orderIndex != null) {
            existing.setOrderIndex(orderIndex);
        }

        return imageRepository.save(existing);
    }


    public void deleteImage(Integer imageId) {
        Image existing = imageRepository.findById(Long.valueOf(imageId))
                .orElseThrow(() -> new RuntimeException("Image not found"));
        azureBlobStorageService.deleteFile(existing.getImagePath());
        imageRepository.deleteById(Long.valueOf(imageId));
    }

}
