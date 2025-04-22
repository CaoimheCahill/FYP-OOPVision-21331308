package com.example.springbootbackend.service;

import com.example.springbootbackend.model.Topic;
import com.example.springbootbackend.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TopicService {

    @Autowired
    private TopicRepository topicRepository;

    public Topic getTopicById(Long id) {
        return topicRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Topic not found"));
    }

    public Topic createTopic(Topic topic) {
        return topicRepository.save(topic);
    }

    public Topic updateTopic(Long id, Topic updatedTopic) {
        Topic existing = getTopicById(id);
        existing.setTopicTitle(updatedTopic.getTopicTitle());
        existing.setTopicDescription(updatedTopic.getTopicDescription());
        return topicRepository.save(existing);
    }

    public void deleteTopic(Long id) {
        if (!topicRepository.existsById(id)) {
            throw new RuntimeException("Topic not found");
        }
        topicRepository.deleteById(id);
    }
}

