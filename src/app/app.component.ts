import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app-teste';
  showHeader:boolean = false;
  hide = true;

  constructor(private _authService: AuthService){}

  ngOnInit(){
      this._authService.showHeaderMenuEmitter.subscribe(
          showHeader => this.showHeader = showHeader
      );
  }
}
