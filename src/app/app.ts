import { Component } from '@angular/core';
import { Form } from '../app/form/form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Form],
  template: `<app-form></app-form>`
})
export class App {}