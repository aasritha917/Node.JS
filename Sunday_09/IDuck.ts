interface IDuck {
  fly(): void;
  sound(): void;
  swim(): void;
}

class ToyDuck implements IDuck {
  fly(): void {
    console.log("Cannot fly");
  }

  sound(): void {
    console.log("Cannot sound");
  }

  swim(): void {
    console.log("Can float on water");
  }
}

const toy = new ToyDuck();
toy.fly();  
toy.sound(); 
toy.swim();  
