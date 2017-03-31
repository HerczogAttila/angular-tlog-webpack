import { Component } from '@angular/core';

@Component({
    selector: 'my-error-modal',
    templateUrl: 'error-modal.component.html',
    styleUrls: ['error-modal.component.scss'],
})

export class ErrorModalComponent {
    public static visible = false;
    public static message = '';

    public static show(message: string): void {
        ErrorModalComponent.message = message;
        ErrorModalComponent.visible = true;
    }

    public static onClose(): void {
        ErrorModalComponent.visible = false;
    }

    public me = ErrorModalComponent;
}
