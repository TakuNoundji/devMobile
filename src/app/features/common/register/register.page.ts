import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  [x: string]: any;
  invitationMessage: string | null = null;
  username: string = '';

  constructor(private authService: AuthenticationService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.invitationMessage = params['invitationMessage'] || null;
      // const userId = params['userId'];
      // if (userId) {
        
      //   console.log('Inscription pour l\'utilisateur avec ID:', userId);
      // }
    });
  }

  login() {
    this.authService.login(this.username);
    this.router.navigate(["home/rubriques"]);
  }

  logout() {
    this.authService.logout();
  }


  getPage(){
    this.router.navigate(["home/rubriques"]);

 }


}
