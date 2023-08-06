"use strict";
import { Calculator } from "./calc.js";
import { CallbackForm } from "./callbackForm.js";
import { CallbackFormIndex } from "./callbackFormIndex.js";
import { ModalWindow } from "./modalWindow.js";
import { animation } from "./animation.js";

window.addEventListener("DOMContentLoaded", () => {
    {
        const buttons = document.querySelectorAll('.button-sticky');
        const buttonsHeader = document.querySelector('.contacts');

        const callbackObserver = (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    const buttonCopy = entry.target.cloneNode(true);
                    buttonCopy.classList.add('button-top');
                    if (buttonCopy.classList.contains("orderCall")) {
                        buttonCopy.addEventListener("click", function(){
                            document.dispatchEvent(new CustomEvent("modalopen"))
                        })
                    };
                    entry.target.refClone = buttonCopy;
                    buttonsHeader.appendChild(buttonCopy);
                } else {
                    if (entry.target.refClone) {
                        entry.target.refClone.remove();
                    }
                }
            })
        }

        const observer = new IntersectionObserver(callbackObserver, { rootMargin: "-100px 0px 0px 0px" });
        buttons.forEach((btn) => observer.observe(btn));
    };

    customElements.define('callback-form', CallbackForm);
    customElements.define('callback-formindex', CallbackFormIndex);
	document.body.appendChild(document.createElement("modal-window"));
	customElements.define('modal-window', ModalWindow);
	const orderCall = document.querySelectorAll('.orderCall');
    orderCall.forEach( (el) => {
        el.addEventListener("click", function(){
            document.dispatchEvent(new CustomEvent("modalopen"))
        })
    });
    try {
        const calc = new Calculator();
    } catch (e) {
        const calc = null;
    }
    animation();
});

window.addEventListener('scroll', function () {
    if (window.pageYOffset != 0) {
        document.querySelector('.contacts').classList.add('active')
    } else {
        document.querySelector('.contacts').classList.remove('active')
    }
})

document.querySelector(".menu-toggle").addEventListener("click", () => {
    document.querySelector(".contacts").style.opacity = (document.querySelector(".contacts").style.opacity == "0")? "1" : "0";
})

