class CallbackForm extends HTMLElement{template=`<div class="form__block">
                    <div class="form__content">
                        <div class="form__title">Оставьте заявку</div>
                        <div class="form__subtitle">Мы свяжемся с Вами, ответим на интересующие вопросы.</div>
                    </div>
                    <div class="form__group">
                        <input class="form__input" type="text" name="name" id="name" required="" placeholder="Введите имя">
                    </div>
                    <div class="form__group">
                        <input class="form__input" type="text" name="email-phone" id="email-phone" required="" placeholder="Введите номер телефона или E-mail">
                    </div>
                    <div class="form__button">
                        <button type="submit" class="button button--form">Отправить</button>
                    </div>
                </div>`;constructor(){super(),this.form=document.createElement("form"),this.form.innerHTML=this.template,this.form.classList.add("form"),this.appendChild(this.form),this.callorder=null,document.addEventListener("callorder",function(e){this.callorder=e.detail}.bind(this)),this.querySelector("form").addEventListener("submit",this.sendForm.bind(this))}async sendForm(e){e.preventDefault();e=this,e={"Имя":e.querySelector("input[name='name']").value,"Контакты":e.querySelector("input[name='email-phone']").value,...e.callorder},e=JSON.stringify(e);fetch("/api/callback",{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:e}),document.dispatchEvent(new CustomEvent("modalclose"))}}export{CallbackForm};