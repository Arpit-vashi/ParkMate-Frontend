import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss'],
    providers: [MessageService]
})
export class UserManagementComponent {
    visible: boolean = false;
    generatedPassword: string = '';

    constructor(private messageService: MessageService) {}

    showDialog() {
        this.visible = true;
    }

    closeDialog() {
      this.visible = false;
  }

    generatePassword(length: number = 15): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters.charAt(randomIndex);
        }
        this.generatedPassword = password;
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
