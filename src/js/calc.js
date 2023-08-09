"use strict";

export class Calculator {
    #price = 0;
    priceDisplay = document.querySelector("div.calculator__button");
    orderButton = document.querySelector("button.calculator__button");

    constructor() {
        this.form = document.querySelector(".calculator__form");
        this.request = {
            "Цена": 0,
        };
        this.form.querySelectorAll(".question__input").forEach( question => {
            question.addEventListener("change", this.calcAll.bind(this) );
        });
        this.orderButton.addEventListener("click", this.callOrder.bind(this));
        this.price = 0;
    };

    get price() {
        return this.#price;
    };

    set price(amount) {
        this.#price = amount;
        this.request["Цена"] = amount;
        this.priceDisplay.textContent = "от " + new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(this.price);
    };

    calcAll() {
        let minPrice = 0;
        const siteType = Array.from(this.form.querySelector("fieldset").querySelectorAll("input")).find(el => el.checked);
        if (siteType) {
        minPrice = Number(!(this.form.querySelector("#q3-a1").checked) ? siteType.dataset.design : siteType.dataset.without);}

        minPrice += Array.from(document.querySelectorAll('.calculator-question[data-include="1"]')).reduce((questionAcc, question) => {
            return questionAcc + Array.from(question.querySelectorAll("input")).reduce((answerAcc, answer) =>
            {
                if (!answer.checked)
                    return answerAcc;
                else {
                    return Number(answer.value) + answerAcc;
            }
            }, 0);
        }, 0);
        this.price = minPrice;
    };

    callOrder() {
        document.querySelectorAll('.calculator-question').forEach( question => {
            const answersText = Array.from(question.querySelectorAll(".question__input")).reduce((acc, answer) => {
                if (answer.checked) {
                    acc.push(answer.parentElement.textContent.trim());
                }
                return acc;

            }, []);
            const questionText = question.querySelector(".calculator__title").textContent;
            if (answersText.length == 1)
            this.request[questionText] = answersText[0];
            else if (answersText.length == 0) {
                this.request[questionText] = null;
            } else {
                this.request[questionText] = answersText;
            }
        })
        document.dispatchEvent(new CustomEvent("modalopen"));
        document.dispatchEvent(new CustomEvent("callorder", {detail: this.request}));
    };
}
