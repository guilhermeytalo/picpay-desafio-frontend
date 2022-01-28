import { TaskModel } from "./../models/TaskModel";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private readonly URL_API = environment.URL_API;

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<TaskModel[]>(`${this.URL_API}/tasks`);
  }

  createTask(model: TaskModel) {
    return this.http.post(`${this.URL_API}/tasks`, model);
  }

  deleteTask(modelId: number) {
    return this.http.delete(`${this.URL_API}/tasks/${modelId}`);
  }

  updateTask(model: TaskModel) {
    return this.http.put(`${this.URL_API}/tasks/${model.id}`, model);
  }
}
