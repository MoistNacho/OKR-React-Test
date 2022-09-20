import { observable } from "mobx";

import Dialog from "./Dialog";
import PopUp from "./PopUp";
import Router from "./Router";

export default class Core {
  public dialog: Dialog;

  public router: Router;

  public popUp: PopUp;

  @observable
  public locale = "ko";

  private stores: {
    [key: string]: any;
  } = {};

  constructor() {
    this.dialog = new Dialog();
    this.router = new Router();
    this.popUp = new PopUp();

    // expose core during tests
    if ((window as any).Cypress) {
      (window as any).core = this;
    }
  }

  public addStore = (key: string, store: any) => {
    this.stores[key] = store;
  };

  public getStore = (key: string) => this.stores[key];

  public clearStores = () => {
    this.stores = {};
  };

  public reset = () => this.clearStores();
}
