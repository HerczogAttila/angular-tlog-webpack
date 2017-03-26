import { Component } from '@angular/core';

@Component({
    selector: 'my-error-modal',
    templateUrl: 'error-modal.component.html',
    styleUrls: ['error-modal.component.scss'],
})

export class ErrorModalComponent {
    private static visible = false;
    private static message = '';

    public static show(message: string): void {
        ErrorModalComponent.message = message;
        ErrorModalComponent.visible = true;
    }

    public getVisible(): boolean {
        return ErrorModalComponent.visible;
    }

    public getMessage(): string {
        return ErrorModalComponent.message;
    }

    public onClose(): void {
        ErrorModalComponent.visible = false;
    }
}
