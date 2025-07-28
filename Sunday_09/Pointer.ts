import { Printer } from "./interfaces/Printer";

export class OldPrinter implements Printer {
  print(): void {
    console.log("Printing from Old Printer...");
  }
}




import { Printer } from "./interfaces/Printer";
import { Scanner } from "./interfaces/Scanner";
import { Fax } from "./interfaces/Fax";

export class SmartPrinter implements Printer, Scanner, Fax {
  print(): void {
    console.log("Printing from Smart Printer...");
  }

  scan(): void {
    console.log("Scanning document...");
  }

  fax(): void {
    console.log("Sending fax...");
  }
}



import { OldPrinter } from "./OldPrinter";
import { SmartPrinter } from "./SmartPrinter";

const oldPrinter = new OldPrinter();
oldPrinter.print();

const smartPrinter = new SmartPrinter();
smartPrinter.print(); 
smartPrinter.scan();  
smartPrinter.fax();  
