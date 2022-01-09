import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RepositoryService } from'../../../shared/repository.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private service: RepositoryService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      value: [null, [Validators.required]],
      date: [null, [Validators.required]],
      title: [null],
    });
  }

  submitForm() {
    if (!this.form.valid) {
      return;
    }

    this.service.create("tasks", this.form.value).subscribe(res => console.log(res));
  }

}
