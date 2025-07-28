export interface Flyable {
  fly(): void;
}



export abstract class Bird {
  abstract name: string;
}



import { Bird } from "./Bird";
import { Flyable } from "./Flyable";

export class Sparrow extends Bird implements Flyable {
  name = "Sparrow";

  fly(): void {
    console.log("Sparrow flying...");
  }
}


import { Bird } from "./Bird";

export class Ostrich extends Bird {
  name = "Ostrich";

  walk(): void {
    console.log("Ostrich walking...");
  }
}



import { Sparrow } from "./Sparrow";
import { Ostrich } from "./Ostrich";
import { Flyable } from "./Flyable";

function makeItFly(bird: Flyable): void {
  bird.fly();
}

const sparrow = new Sparrow();
makeItFly(sparrow);
const ostrich = new Ostrich();
