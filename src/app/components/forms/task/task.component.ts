import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RepositoryService } from'../../../shared/repository.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  form: FormGroup;
  @Input() task?: any;
  @Input() formType?: any;
  @Input() dialogRef:any;
  router: Router;

  constructor(private fb: FormBuilder, private service: RepositoryService, router: Router) {
    this.router = router;
  }

  ngOnInit(): void {
    if (this.task) {
      this.form = this.fb.group({
        username: [this.task.username, [Validators.required]],
        value: [this.task.value, [Validators.required]],
        date: [this.task.date, [Validators.required]],
        title: [this.task.title],
      });
    }
    else {
      this.form = this.fb.group({
        username: [null, [Validators.required]],
        value: [null, [Validators.required]],
        date: [null, [Validators.required]],
        title: [null],
      });
    }
    
  }

  submitForm() {
    if (!this.form.valid) {
      return;
    }
    if (this.formType === 'edit') {
      this.service.update("tasks", this.task.id,this.form.value).subscribe(res => {
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
        this.dialogRef.close();
      });
    }
    else {
      this.service.create("tasks", this.form.value).subscribe(res => {
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
        this.dialogRef.close();
      });
    }
    
  }

}
