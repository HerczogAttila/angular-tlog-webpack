import { Component } from '@angular/core';
import { ModalComponent } from '../modal.component';

@Component({
    selector: 'my-error-modal',
    templateUrl: 'error-modal.component.html',
    styleUrls: ['error-modal.component.scss'],
})

export class ErrorModalComponent extends ModalComponent { }
