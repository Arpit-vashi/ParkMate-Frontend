import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private router:Router){}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNo: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: this.passwordsMustMatch });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }

  get username(): any {
    return this.registerForm.get('username');
  }

  get name(): any {
    return this.registerForm.get('name');
  }

  get email(): any {
    return this.registerForm.get('email');
  }

  get mobileNo(): any {
    return this.registerForm.get('mobileNo');
  }

  get password(): any {
    return this.registerForm.get('password');
  }

  get confirmPassword(): any {
    return this.registerForm.get('confirmPassword');
  }

  private passwordsMustMatch(formGroup: FormGroup): any {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mustMatch: true };
  }

  navigatetologin(){
    this.router.navigate(['/Login']);
  }
}
