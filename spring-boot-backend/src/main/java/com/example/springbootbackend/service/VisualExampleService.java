package com.example.springbootbackend.service;

import com.example.springbootbackend.model.Image;
import com.example.springbootbackend.model.VisualExample;
import com.example.springbootbackend.repository.ImageRepository;
import com.example.springbootbackend.repository.VisualExampleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisualExampleService {

    @Autowired
    private VisualExampleRepository visualExampleRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private AzureBlobStorageService azureBlobStorageService;

    public List<VisualExample> getVisualExamplesByTopicId(Integer topicId) {
        return visualExampleRepository.findByTopicId(topicId);
    }

    public VisualExample getVisualExampleById(Integer id) {
        return visualExampleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Visual Example not found"));
    }

    public VisualExample createVisualExample(VisualExample visualExample) {
        return visualExampleRepository.save(visualExample);
    }

    public VisualExample updateVisualExample(Integer id, VisualExample updatedExample) {
        VisualExample existing = getVisualExampleById(id);
        existing.setName(updatedExample.getName());
        existing.setTopicId(updatedExample.getTopicId());
        return visualExampleRepository.save(existing);
    }

    public void deleteVisualExample(Integer id) {
        if (!visualExampleRepository.existsById(id)) {
            throw new RuntimeException("Visual Example not found");
        }
        List<Image> images = imageRepository.findByVisualExampleId(id);
        for (Image img : images) {
            azureBlobStorageService.deleteFile(img.getImagePath());
        }
        imageRepository.deleteAll(images);
        visualExampleRepository.deleteById(id);
    }
}
