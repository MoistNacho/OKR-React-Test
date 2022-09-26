import { action, observable } from "mobx";

export type TodoItem = {
  id: number;
  name: string;
};

export default class TodoStore {
  @observable
  public todoList: TodoItem[] = [
    { id: 0, name: "Javascript" },
    { id: 1, name: "React" },
    { id: 2, name: "Next.js" },
  ];

  @observable
  public nextId = 3;

  @action.bound
  public handleAddItem(name: string) {
    this.todoList = [...this.todoList, { id: this.nextId, name }];
    this.nextId += 1;
  }

  @action.bound
  public handleUpdateItem(id: number, name: string) {
    const newArray = this.todoList.map((item) => {
      if (item.id === id) {
        return { ...item, name };
      }

      return { ...item };
    });

    this.todoList = newArray;
  }

  @action.bound
  public handleRemoveItem(id: number) {
    const newArray = this.todoList.filter((item) => {
      if (item.id === id) return;

      return { ...item };
    });

    this.todoList = newArray;
  }
}
