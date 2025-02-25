import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { NgIf } from "@angular/common";
import { MatSlideToggle } from "@angular/material/slide-toggle";

@Component({
  selector: 'app-step2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatError,
    MatLabel,
    MatInput,
    NgIf,
    MatSlideToggle
  ],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.css'
})

export class Step2Component {
  @Input() form!: FormGroup; // Input for the FormGroup from the parent
  private fb = inject(FormBuilder); // assignment

  constructor() {
    this.form = this.fb.group({
      excerpt: ['', [Validators.required]],
      description: ['', [Validators.required]],
      is_published: ['', [false]],
    })
  }

}
