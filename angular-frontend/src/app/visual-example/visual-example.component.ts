import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Title} from '@angular/platform-browser';
import {ImageService} from '../service/image.service';
import { Image} from '../service/image.service';

@Component({
  selector: 'app-visual-example',
  standalone: true,
    imports: [
        MatButtonModule,
        MatToolbarModule,
        NgOptimizedImage,
        RouterLink,
        CommonModule
    ],
  templateUrl: './visual-example.component.html',
  styleUrl: './visual-example.component.scss'
})
export class VisualExampleComponent implements OnInit{
  topicId!: number;
  images: Image[] = [];
  leftImages: Image[] = [];
  rightImages: Image[] = [];
  currentIndex = 0;


  constructor(private titleService: Title, private route:ActivatedRoute, private imageService: ImageService, private router:Router) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Visual Example');
    this.route.params.subscribe(params => {
      this.topicId = +params['topicId'];
      this.fetchImages();
    });
  }

  fetchImages(): void {
    this.imageService.getImagesByTopic(this.topicId).subscribe(data => {
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
    this.router.navigate(['/topic', this.topicId])

  }
}
