import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Image, ImageService} from '../../service/image.service';
import {ActivatedRoute, Router} from '@angular/router';
import {VisualExampleService} from '../../service/visual-example.service';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-admin-example-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './admin-example-form.component.html',
  styleUrl: './admin-example-form.component.scss'
})
export class AdminExampleFormComponent implements OnInit {
  exampleForm!: FormGroup;
  topicId!: number;
  visualExampleId?: number;

  parts: Array<{
    orderIndex: number;
    leftFile?: File;
    rightFile?: File;
    existingLeftImage?: Image;
    existingRightImage?: Image;
  }> = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    protected router: Router,
    private visualExampleService: VisualExampleService,
    private imageService: ImageService
  ) {
  }

  ngOnInit(): void {
    this.topicId = +this.route.snapshot.paramMap.get('topicId')!;
    this.exampleForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.parts.push({orderIndex: 1});

    const veIdParam = this.route.snapshot.paramMap.get('visualExampleId');
    if (veIdParam && veIdParam !== 'new') {
      this.visualExampleId = +veIdParam;
      this.loadVisualExample();
    }
  }

  loadVisualExample(): void {
    this.visualExampleService.getVisualExampleById(this.visualExampleId!).subscribe({
      next: (example) => {
        this.exampleForm.patchValue({name: example.name});
        this.imageService.getImagesByVisualExampleId(this.visualExampleId!).subscribe({
          next: (images) => {
            const partsMap = new Map<number, any>();
            images.forEach(img => {
              const part = partsMap.get(img.orderIndex) || {orderIndex: img.orderIndex};
              if (img.imageSide === 'left') {
                part.existingLeftImage = img;
              } else if (img.imageSide === 'right') {
                part.existingRightImage = img;
              }
              partsMap.set(img.orderIndex, part);
            });
            this.parts = Array.from(partsMap.values()).sort((a, b) => a.orderIndex - b.orderIndex);
          },
          error: (err) => console.error('Error loading images:', err)
        });
      },
      error: (err) => console.error('Error loading visual example:', err)
    });
  }

  onLeftFileSelected(event: any, index: number) {
    this.parts[index].leftFile = event.target.files[0];
  }

  onRightFileSelected(event: any, index: number) {
    this.parts[index].rightFile = event.target.files[0];
  }

  addPart(): void {
    const newIndex = this.parts.length > 0 ? Math.max(...this.parts.map(p => p.orderIndex)) + 1 : 1;
    this.parts.push({orderIndex: newIndex});
  }

  removePart(index: number): void {
    const part = this.parts[index];
    if (!confirm('Are you sure you want to delete this part? All images in this part will be permanently deleted.')) {
      return;
    }
    const deletionPromises: Promise<any>[] = [];

    if (part.existingLeftImage) {
      deletionPromises.push(
        this.imageService.deleteImage(part.existingLeftImage.imageId).toPromise()
      );
    }
    if (part.existingRightImage) {
      deletionPromises.push(
        this.imageService.deleteImage(part.existingRightImage.imageId).toPromise()
      );
    }

    // If there are images to delete, wait for deletion before removing the part.
    Promise.all(deletionPromises)
      .then(() => {
        this.parts.splice(index, 1);
        console.log('Part and its images deleted successfully.');
      })
      .catch(err => {
        console.error('Error deleting images for part:', err);
      });
  }

  save(): void {
    const formValue = this.exampleForm.value; // { name: ... }
    if (this.visualExampleId) {
      // Update existing visual example
      this.visualExampleService.updateVisualExample(this.visualExampleId, {
        name: formValue.name,
        topicId: this.topicId
      }).subscribe({
        next: (updatedExample) => {
          this.saveParts(updatedExample.visualExampleId);
        },
        error: (err) => console.error('Error updating visual example:', err)
      });
    } else {
      // Create new visual example
      this.visualExampleService.createVisualExample(this.topicId, {name: formValue.name}).subscribe({
        next: (createdExample) => {
          // Save the newly created visualExampleId and then save parts
          this.visualExampleId = createdExample.visualExampleId;
          this.saveParts(createdExample.visualExampleId);
        },
        error: (err) => console.error('Error creating visual example:', err)
      });
    }
  }

  saveParts(visualExampleId: number): void {
    // Iterate over each part and save left and right images
    this.parts.forEach(part => {
      // Save left image
      if (part.leftFile) {
        if (part.existingLeftImage) {
          this.imageService.updateImage(part.existingLeftImage.imageId, part.leftFile, 'left', part.orderIndex)
            .subscribe({next: () => console.log('Left image updated for part ' + part.orderIndex)});
        } else {
          this.imageService.addImage(visualExampleId, part.leftFile, 'left', part.orderIndex)
            .subscribe({next: () => console.log('Left image created for part ' + part.orderIndex)});
        }
      }
      // Save right image
      if (part.rightFile) {
        if (part.existingRightImage) {
          this.imageService.updateImage(part.existingRightImage.imageId, part.rightFile, 'right', part.orderIndex)
            .subscribe({next: () => console.log('Right image updated for part ' + part.orderIndex)});
        } else {
          this.imageService.addImage(visualExampleId, part.rightFile, 'right', part.orderIndex)
            .subscribe({next: () => console.log('Right image created for part ' + part.orderIndex)});
        }
      }
    });
    this.router.navigate(['/admin/topics', this.topicId, 'examples']);
  }

}
