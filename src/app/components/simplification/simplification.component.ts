import { Component } from '@angular/core';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-simplification',
  standalone: true,
  imports: [ReactiveFormsModule, TextareaModule, ButtonModule, MessageModule, ToastModule, ButtonModule, ProgressSpinnerModule, FloatLabel, FormsModule],
  templateUrl: './simplification.component.html',
  styleUrl: './simplification.component.scss',
  providers: [MessageService]
})
export class SimplificationComponent {
  form!: FormGroup;
  formSubmitted: boolean = false;
  summary: string = '';
  isInputEmpty: boolean = true;
  wordCount: number = 0;
  constructor(private messageService: MessageService, private ApiService: ApiService, private router: Router) {
    this.form = new FormGroup({
      text: new FormControl('')
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

  get text(): string {
    return this.form.get('text')?.value || '';
  }

  getSummary() {
    if (this.form.valid) {
      this.ApiService.summarizeText(this.form.value.text).subscribe({
        next: (response) => {
          console.log('Text summarized successfully:', response);
          this.summary = response.summary;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Text summarized successfully', life: 3000 });
          this.form.patchValue({ text: response.summary });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to summarize text', life: 3000 });
          console.error('Error summarizing text:', error);
        }
      });
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill out the form correctly', life: 3000 });
    }
  }

  countWords(): void {
    this.wordCount = this.text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  onSubmit() {
    this.formSubmitted = true;
    this.getSummary();
  }

  onBackToMenu() {
    this.summary = '';
    this.form.reset();
    this.router.navigate(['/homepage']);
  }

  resetUpload() {
    this.form.reset();
    this.formSubmitted = false;
    this.summary = '';
    this.wordCount = 0;
}
}
