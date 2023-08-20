export class CallbackFormIndexInline extends HTMLElement {
template = `<div class="form__group">
                  <input class="form__input-inline" type="text" name="name" id="name" required="" placeholder="Введите имя">
              </div>
              <div class="form__group">
                  <input class="form__input-inline" type="text" name="email-phone" id="email-phone" required="" placeholder="Введите номер телефона или E-mail">
              </div>
              <div class="form__button-inline">
                  <button type="submit" class="button button--form">Отправить</button>
              </div>`;
  constructor() {
    super();
    this.form = document.createElement('form');
    this.form.innerHTML = this.template;
    this.form.classList.add('form');
    this.appendChild(this.form);
    this.callorder = null;
    document.addEventListener("callorder", (function (event){this.callorder = event.detail}).bind(this));
    this.querySelector("form").addEventListener("submit", this.sendForm.bind(this));
  };

  async sendForm (event) {
    event.preventDefault();
    const callbackForm = this;
    const form = {
        "Имя": callbackForm.querySelector("input[name='name']").value,
        "Контакты": callbackForm.querySelector("input[name='email-phone']").value,
        ...callbackForm.callorder
    };
    const order = JSON.stringify(form);
    fetch('/api/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: order
      });
      document.dispatchEvent(new CustomEvent("modalclose"));
    }
}
