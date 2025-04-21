package com.example.springbootbackend.dto;

import com.example.springbootbackend.model.Progress;

import java.util.List;

public class UserProgressResponse {

    private List<Progress> progress;
    private double completionPercentage;

    public UserProgressResponse(List<Progress> progress, double completionPercentage) {
        this.progress = progress;
        this.completionPercentage = completionPercentage;
    }

    public List<Progress> getProgress() {
        return progress;
    }

    public void setProgress(List<Progress> progress) {
        this.progress = progress;
    }

    public double getCompletionPercentage() {
        return completionPercentage;
    }

    public void setCompletionPercentage(double completionPercentage) {
        this.completionPercentage = completionPercentage;
    }
}

