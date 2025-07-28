export class TaskService {
  createTask(name: string) {
    console.log(`Creating task: ${name}`);
  }
}



export class EmailService {
  sendEmail(to: string) {
    console.log(`Sending email to ${to}`);
  }
}


import { TaskService } from "./TaskService";
import { EmailService } from "./EmailService";

const taskService = new TaskService();
taskService.createTask("Complete SRP Refactor");

const emailService = new EmailService();
emailService.sendEmail("example@masai.com");
