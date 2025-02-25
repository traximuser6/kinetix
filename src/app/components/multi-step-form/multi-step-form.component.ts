import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { PostService } from "../../services/post.service";
import { Post } from "../../models/post.model";
import { generateRandomNumber } from "../../utils/utils";
import { MatCard, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatStep, MatStepLabel, MatStepper } from "@angular/material/stepper";
import { Step1Component } from "../multi-step-post-form/step1/step1.component";
import { MatButton } from "@angular/material/button";
import { Step2Component } from "../multi-step-post-form/step2/step2.component";

@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatStepper,
    MatCardContent,
    MatStep,
    Step1Component,
    MatStepLabel,
    MatButton,
    Step2Component
  ],
  templateUrl: './multi-step-form.component.html',
  styleUrl: './multi-step-form.component.css'
})

export class MultiStepFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private postService = inject(PostService);
  private router = inject(Router);

  masterForm: FormGroup = this.fb.group({
    step1: this.fb.group({}),
    step2: this.fb.group({}),
  });

  activeIndex = 0;
  isLinear = true;

  ngOnInit() {
  }

  get step1Form(): FormGroup {
    return this.masterForm.get('step1') as FormGroup;
  }

  get step2Form() {
    return this.masterForm.get('step2') as FormGroup;
  }

  previousStep(): void {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  onSubmit(): void {

    if (this.masterForm.valid) {

      const post: Post = {
        id: generateRandomNumber(),
        title: this.step1Form.get('title')?.value,  // from step 1 form
        slug: this.step1Form.get('slug')?.value,    // from step 1 form
        excerpt: this.step2Form.get('excerpt')?.value,  // from step 2 form
        description: this.step2Form.get('description')?.value,  // from step 2 form
        is_published: this.step2Form.get('is_published')?.value,  // from step 2 form
        created_at: new Date(),
        updated_at: new Date()
      };

      this.postService.addPost(post).subscribe({
        next: () => {
          this.router.navigate(['/']).then(r => () => {
            console.log('Navigation result:', r)
          })
        },
        error: err => {
          console.log('Error creating post:', err);
        }
      });
    }
  }

  private getStepName(): string {
    return `step${this.activeIndex + 1}`;
  }

}
