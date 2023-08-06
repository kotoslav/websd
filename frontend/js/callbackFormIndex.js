import { CallbackForm } from "./callbackForm.js";

export class CallbackFormIndex extends CallbackForm {
  constructor() {
    super();
    this.form.classList.add('_anim-items');
    this.form.setAttribute('id', 'form-animation')
  };
}
