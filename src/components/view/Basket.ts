import { IBasket } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Basket extends Component<IBasket> {
  protected listElement: HTMLElement;
  protected makeOrderButton: HTMLButtonElement;
  protected totalPrice: HTMLElement;

  constructor(container: HTMLElement, private events: IEvents) {
    super(container);

    this.listElement = ensureElement<HTMLElement>(
      ".basket__list",
      this.container
    );
    this.makeOrderButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container
    );
    this.totalPrice = ensureElement<HTMLElement>(
      ".basket__price",
      this.container
    );

    this.makeOrderButton.addEventListener("click", (e) => {
      e.preventDefault();
      events.emit("cart:make-order");
    });
  }

  set items(items: HTMLElement[]) {
    this.listElement.replaceChildren(...items);
  }

  set total(value: number | null) {
    this.totalPrice.textContent = value ? `${value} синапсисов` : "Бесценно";
  }
}
