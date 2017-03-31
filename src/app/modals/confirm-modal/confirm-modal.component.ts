import { Component } from '@angular/core';

@Component({
    selector: 'my-confirm-modal',
    templateUrl: 'confirm-modal.component.html',
    styleUrls: ['confirm-modal.component.scss'],
})

export class ConfirmModalComponent {
    public static visible = false;
    public static message = '';
    public static confirm: Function;

    public me = ConfirmModalComponent;

    public static show(message: string, confirm: Function): void {
        ConfirmModalComponent.message = message;
        ConfirmModalComponent.confirm = confirm;
        ConfirmModalComponent.visible = true;
    }

    public static onClose(): void {
        ConfirmModalComponent.visible = false;
    }

    public static onConfirm(): void {
        ConfirmModalComponent.visible = false;
        ConfirmModalComponent.confirm();
    }
}
