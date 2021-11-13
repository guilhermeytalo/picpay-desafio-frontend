import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuHidden: boolean = true;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
            
  }

  showMenu(){    
    this.menuHidden = !this.menuHidden;
  }

  logout(){
    this.authService.logout();
  }

}
