import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from './../../../services/user.service';
import { CountryService } from './../../../services/country.service';
import { UserRequest } from './../../../models/user-management/user-request.model';
import { CountryDTO } from './../../../models/country/country.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-management',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [MessageService],
})
export class AddUserComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  visible: boolean = false;
  generatedPassword: string = '';
  loading: boolean = false; // Loading state
  passwordStrength: number = 0; // Password strength state
  submitted: boolean = false;
  countries: CountryDTO[] = []; // Store countries
  private subscriptions: Subscription = new Subscription(); // Subscription management

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private countryService: CountryService, // Inject CountryService
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCountries(); // Fetch countries on component initialization
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Unsubscribe from all subscriptions
  }

  initializeForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]], // Allow only letters and spaces
      username: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z0-9]+$')]], // Alphanumeric only
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{1,3}-[0-9]{7,10}$')]], // Example pattern for (countrycode)-(mobilenumber)
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      countryId: ['', [Validators.required]], // Use countryId instead of country
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }

  loadCountries() {
    this.loading = true; // Start loading
    const countriesSubscription = this.countryService.getAllCountries().subscribe(
      (countries) => {
        this.countries = countries;
        console.log('Countries:', this.countries);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.error('Error loading countries:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Load Error',
          detail: 'Failed to load countries.',
        });
      }
    );
    this.subscriptions.add(countriesSubscription);
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  updatePasswordStrength(password: string) {
    // Basic strength evaluation
    if (password.length < 6) {
      this.passwordStrength = 0; // Weak
    } else if (password.length < 12) {
      this.passwordStrength = 50; // Medium
    } else {
      this.passwordStrength = 100; // Strong
    }
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill out the form correctly',
      });
      return;
    }

    this.loading = true; // Start loading

    const userPayload: UserRequest = {
      name: this.userForm.value.name,
      username: this.userForm.value.username,
      mobileNo: this.userForm.value.mobileNo,
      email: this.userForm.value.email,
      address: this.userForm.value.address,
      city: this.userForm.value.city,
      state: this.userForm.value.state,
      countryId: this.userForm.value.countryId.id,
      password: this.userForm.value.password,
    };

    console.log('Request Payload:', userPayload);

    this.userService.createUser(userPayload).subscribe(
      (response) => {
        this.loading = false; // Stop loading
        this.messageService.add({
          severity: 'success',
          summary: 'User Created',
          detail: `User ${response.username} created successfully!`,
        });
        this.userForm.reset(); // Clear the form after success
        this.passwordStrength = 0; // Reset password strength
      },
      (error) => {
        this.loading = false; // Stop loading
        this.messageService.add({
          severity: 'error',
          summary: 'Creation Failed',
          detail: 'An error occurred while creating the user',
        });
      }
    );
  }

  // Show Password Dialog
  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  generatePassword(length: number = 15) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
    this.generatedPassword = password;
    this.userForm.patchValue({ password: password });
    this.updatePasswordStrength(password);
    return password;
  }

  copyPassword() {
    if (this.generatedPassword) {
      navigator.clipboard.writeText(this.generatedPassword).then(() => {
        this.messageService.add({ severity: 'success', summary: 'Copied', detail: 'Password copied to clipboard!' });
      });
    }
  }
}
