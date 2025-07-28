import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Router } from '@angular/router';


@Component({
  selector: 'app-image-generator',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, MessageModule, ToastModule, ButtonModule, CommonModule, ProgressSpinnerModule],
  templateUrl: './image-generator.component.html',
  styleUrl: './image-generator.component.scss',
  providers: [MessageService]
})
export class ImageGeneratorComponent {
  form!: FormGroup;
  formSubmitted: boolean = false;
  generatedImage: string = '';
  isInputEmpty: boolean = true;
  constructor(private messageService: MessageService, private ApiService: ApiService, private router: Router) {
    this.form = new FormGroup({
      text: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.form.get('text')?.valueChanges.subscribe((value) => {
      const text = (value || '').toString();
      this.isInputEmpty = false;
      if (text && text.trim() === '') {
        this.isInputEmpty = true;
      }
    });
  }

  getImage() {
    if (this.form.valid) {
      this.ApiService.getImage(this.form.value.text).subscribe({
        next: (response) => {
          this.generatedImage = "data:image/png;base64," + response.image;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Image generated successfully', life: 3000 });
          this.form.patchValue({ text: response });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to generate text', life: 3000 });
          console.error('Error generating text:', error);
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill out the form correctly', life: 3000 });
    }
  }

  downloadImage(): void {
    if (!this.generatedImage) {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'No image to download', life: 3000 });
      return;
    }
    const link = document.createElement('a');
    console.log('Downloading image:', link);
    link.href = this.generatedImage; // Base64-URL
    link.download = 'generated-image.png';
    link.click();
  }

  onSubmit() {
    this.formSubmitted = true;
    this.getImage();
  }

  onBackToMenu() {
    this.generatedImage = '';
    this.form.reset();
    this.router.navigate(['/homepage']);
  }

  resetUpload() {
    this.form.reset();
    this.formSubmitted = false;
    this.generatedImage = '';
  }
}
