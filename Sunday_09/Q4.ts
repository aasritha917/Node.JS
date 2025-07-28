
class PolyDuck {
  fly(): void {
    console.log("Duck is flying...");
  }
}

class DesiDuck extends PolyDuck {
  override fly(): void {
    console.log("DesiDuck flies at 10kmph");
  }
}

class VidesiDuck extends PolyDuck {
  override fly(): void {
    console.log("VidesiDuck flies at 20kmph");
  }
}

class SmartDuck extends PolyDuck {
  override fly(): void {
    console.log("SmartDuck flies at 50kmph");
  }
}

function makeDuckFly(duck: PolyDuck): void {
  duck.fly();
}

makeDuckFly(new DesiDuck());   
makeDuckFly(new VidesiDuck());
makeDuckFly(new SmartDuck());  
