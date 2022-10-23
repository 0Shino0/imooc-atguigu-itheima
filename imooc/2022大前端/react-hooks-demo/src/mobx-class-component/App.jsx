import React from 'react';

import { makeObservable, observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';

class Store {
  @observable
  count = 0;

  constructor() {
    makeObservable(this);
  }

  @computed
  get double() {
    return this.count * 2;
  }
  @action
  increment() {
    this.count++;
  }
  @action
  decrement() {
    this.count--;
  }
}

@observer
export default class App extends React.Component {
  constructor() {
    super();
    this.store = new Store();
  }

  render() {
    const { count, double } = this.store;
    return (
      <div>
        <h1>count: {count}</h1>
        <h1>double count: {double}</h1>
        <button onClick={() => this.store.increment()}>+1</button>
        <button onClick={() => this.store.decrement()}>-1</button>
      </div>
    );
  }
}
