import { Component } from '@angular/core';

@Component({
    selector: 'my-confirm-modal',
    templateUrl: 'confirm-modal.component.html',
    styleUrls: ['confirm-modal.component.scss'],
})

export class ConfirmModalComponent {
    private static visible = false;
    private static message = '';
    private static confirm: Function;

    public static show(message: string, confirm: Function): void {
        ConfirmModalComponent.message = message;
        ConfirmModalComponent.confirm = confirm;
        ConfirmModalComponent.visible = true;
    }

    public isVisible(): boolean {
        return ConfirmModalComponent.visible;
    }

    public getMessage(): string {
        return ConfirmModalComponent.message;
    }

    public onClose(): void {
        ConfirmModalComponent.visible = false;
    }

    public onConfirm(): void {
        ConfirmModalComponent.visible = false;
        ConfirmModalComponent.confirm();
    }
}
