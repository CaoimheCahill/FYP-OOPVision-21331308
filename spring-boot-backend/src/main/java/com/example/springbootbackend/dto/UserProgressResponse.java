package com.example.springbootbackend.dto;

import com.example.springbootbackend.model.Progress;
import java.util.List;

public class UserProgressResponse {

    private List<Progress> progress;           // List of progress data for each topic
    private double completionPercentage;       // Overall completion percentage

    // Constructor to initialize the fields
    public UserProgressResponse(List<Progress> progress, double completionPercentage) {
        this.progress = progress;
        this.completionPercentage = completionPercentage;
    }

    // Getter and Setter for 'progress'
    public List<Progress> getProgress() {
        return progress;
    }

    public void setProgress(List<Progress> progress) {
        this.progress = progress;
    }

    // Getter and Setter for 'completionPercentage'
    public double getCompletionPercentage() {
        return completionPercentage;
    }

    public void setCompletionPercentage(double completionPercentage) {
        this.completionPercentage = completionPercentage;
    }
}

