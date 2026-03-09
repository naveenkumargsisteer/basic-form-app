import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrls: ['./form.css']
})
export class Form {

  userForm: FormGroup;
  loginForm: FormGroup;
  showLogin = false;

  private registerUrl = 'http://localhost:8000/register';
  private loginUrl = 'http://localhost:8000/login';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  toggleLogin() {
    this.showLogin = !this.showLogin;
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.http.post(this.registerUrl, this.userForm.value)
        .subscribe({
          next: (response) => {
            console.log('registered', response);
            this.userForm.reset();
          },
          error: (error) => {
            console.error(error);
          }
        });
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.http.post(this.loginUrl, this.loginForm.value)
        .subscribe({
          next: (response) => {
            console.log('logged in', response);
            this.loginForm.reset();
          },
          error: (error) => {
            console.error(error);
          }
        });
    }
  }
}