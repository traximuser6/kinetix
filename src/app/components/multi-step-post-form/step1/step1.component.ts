import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf,
    MatLabel,
    MatError
  ],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.css'
})

export class Step1Component {
  private fb = inject(FormBuilder);
  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      slug: ['', [Validators.required, Validators.pattern('/^[a-z0-9-]+$/')]],
    })
  }

}
