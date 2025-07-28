export interface IShippingStrategy {
  calculate(): number;
}




import { IShippingStrategy } from "./IShippingStrategy";

export class StandardShipping implements IShippingStrategy {
  calculate(): number {
    return 50;
  }
}


import { IShippingStrategy } from "./IShippingStrategy";

export class ExpressShipping implements IShippingStrategy {
  calculate(): number {
    return 100;
  }
}



import { IShippingStrategy } from "./IShippingStrategy";

export class Shipping {
  private strategy: IShippingStrategy;

  constructor(strategy: IShippingStrategy) {
    this.strategy = strategy;
  }

  getCost(): number {
    return this.strategy.calculate();
  }
}



import { Shipping } from "./Shipping";
import { StandardShipping } from "./StandardShipping";
import { ExpressShipping } from "./ExpressShipping";

const standard = new Shipping(new StandardShipping());
console.log(standard.getCost()); // 50

const express = new Shipping(new ExpressShipping());
console.log(express.getCost()); // 100



import { IShippingStrategy } from "./IShippingStrategy";

export class OvernightShipping implements IShippingStrategy {
  calculate(): number {
    return 150;
  }
}



import { OvernightShipping } from "./OvernightShipping";

const overnight = new Shipping(new OvernightShipping());
console.log(overnight.getCost()); // 150
