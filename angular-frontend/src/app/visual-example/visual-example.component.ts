import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Title} from '@angular/platform-browser';
import {ImageService} from '../service/image.service';
import {Image} from '../service/image.service';
import {ProgressService} from '../service/progress.service';

@Component({
  selector: 'app-visual-example',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './visual-example.component.html',
  styleUrl: './visual-example.component.scss'
})
export class VisualExampleComponent implements OnInit {
  topicId!: number;
  visualExampleId!: number;
  images: Image[] = [];
  leftImages: Image[] = [];
  rightImages: Image[] = [];
  currentIndex = 0;


  constructor(private titleService: Title, private route: ActivatedRoute, private imageService: ImageService, private router: Router, private progressService: ProgressService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Visual Example');
    this.route.params.subscribe(params => {
      this.topicId = +params['topicId'];
      this.visualExampleId = +params['visualExampleId'];
      this.fetchImages();
    });
  }

  fetchImages(): void {
    this.imageService.getImagesByVisualExampleId(this.visualExampleId).subscribe(data => {
      this.images = data;

      // Split into left and right images
      this.leftImages = this.images.filter(img => img.imageSide === 'left').sort((a, b) => a.orderIndex - b.orderIndex);
      this.rightImages = this.images.filter(img => img.imageSide === 'right').sort((a, b) => a.orderIndex - b.orderIndex);

    });
  }

  onImageError(event: any) {
    console.error("Image failed to load:", event.target.src);
    event.target.src = 'assets/defaultImage.png';
  }

  nextImages(): void {
    if (this.currentIndex < this.leftImages.length - 1) {
      this.currentIndex++;
    }
  }

  previousImages(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  isLast(): boolean {
    return this.currentIndex === this.leftImages.length - 1;
  }

  finish() {
    this.progressService.markViewedExample(this.topicId).subscribe({
      next: () => {
        this.router.navigate(['/topic', this.topicId]);
      },
      error: (err) => {
        console.error('Error updating progress:', err);
        this.router.navigate(['/topic', this.topicId]);
      }
    });
  }
}
