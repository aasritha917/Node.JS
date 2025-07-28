
interface PaymentStrategy {
  pay(amount: number): void;
}


class CardPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ₹${amount} using Card`);
  }
}

class UPIPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ₹${amount} using UPI`);
  }
}

class BitcoinPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ₹${amount} using Bitcoin`);
  }
}


class Payment {
  private strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy;
  }

  process(amount: number): void {
    this.strategy.pay(amount);
  }
}


const payment = new Payment(new CardPayment());
payment.process(1000); 

payment.setStrategy(new BitcoinPayment());
payment.process(2000); 

payment.setStrategy(new UPIPayment());
payment.process(500);  
