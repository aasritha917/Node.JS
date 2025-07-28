
interface Database {
  save(data: string): void;
}

class MySQLService implements Database {
  save(data: string): void {
    console.log("Saving to MySQL:", data);
  }
}

class UserService {
  private db: Database;

  constructor(database: Database) {
    this.db = database;
  }

  register(user: string): void {
    this.db.save(user);
  }
}

const mysql = new MySQLService();
const userService = new UserService(mysql);
userService.register("Duck User");
