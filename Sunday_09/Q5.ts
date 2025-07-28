
class User {
  public name: string;
  private orgCode: string = "DuckCorp";
  protected role: string;

  constructor(name: string, role: string) {
    this.name = name;
    this.role = role;
  }

  introduce(): void {
    console.log(`I am ${this.name} from ${this.orgCode}`);
  }
}

class Manager extends User {
  getRole(): void {
    console.log(this.role);
  }
}

const daffy = new User("Daffy", "Employee");
daffy.introduce(); 

const boss = new Manager("BossDuck", "Manager");
boss.getRole(); 
