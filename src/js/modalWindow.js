export class ModalWindow extends HTMLElement {
  template = `<div class="modal_window" style="
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0px;
      left: 0px;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 999;
      ">
      <div class="model_form" style="
      display:flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    ">
	<div class="scroll" style="position: relative">
	<div class="modalClose" style="
      position: absolute;
      cursor: pointer;
      top: 20px;
      right: 20px;
      font-size: 32px;
	">&#10005</div>
	<callback-form></callback-form>
	</div>
	</div>
	</div>
	`;

  constructor() {
    super();
    this.form = document.createElement('div');
    this.form.innerHTML = this.template;
	this.style.display="none";
    this.appendChild(this.form);
	document.addEventListener("modalopen",(function(){
      this.style.display="block";
    }).bind(this));
	document.addEventListener("modalclose",(function(){
      this.style.display="none";
    }).bind(this));
    this.querySelector(".modalClose").addEventListener("click", function(){
      document.dispatchEvent(new CustomEvent("modalclose"));
    });
    this.querySelector(".modal_window").addEventListener("click", function(event){
      if (!event.composedPath().includes(this.querySelector('.scroll'))) {
        document.dispatchEvent(new CustomEvent("modalclose"));
      }
    });

    this.scrollable = this.querySelector('div.scroll');
    this.scrollable.addEventListener('wheel', (function(event) {
    const deltaY = event.deltaY;
    const contentHeight = this.scrollable.scrollHeight;
    const visibleHeight = this.scrollable.offsetHeight;
    const scrollTop = this.scrollable.scrollTop;

    if (scrollTop === 0 && deltaY < 0)
        event.preventDefault();
    else if (visibleHeight + scrollTop === contentHeight && deltaY > 0)
        event.preventDefault();
    }).bind(this))
  }
}
