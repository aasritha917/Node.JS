const duck = new Duck(new FastFly());
duck.performFly()

duck.setFlyStrategy(new NoFly());
duck.performFly(); 
