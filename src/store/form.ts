import { action, decorate, observable } from 'mobx';

class FormStore {
  icon = '';

  isExpanded = false;

  name = '';

  value = 0;

  setContent(name: string, value: number, icon: string): void {
    this.name = name;
    this.value = value;
    this.icon = icon;
  }

  expand(shouldExpand: boolean): void {
    this.isExpanded = shouldExpand;
  }

  setName(name: string): void {
    this.name = name;
  }
}

decorate(FormStore, {
  expand: action,
  icon: observable,
  isExpanded: observable,
  name: observable,
  setContent: action,
  setName: action,
  value: observable,
});

export default FormStore;
