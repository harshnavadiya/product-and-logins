import { Component, OnInit } from '@angular/core';
import { Auth0ServiceService } from '../auth0-service.service';
import { Common } from '../common';
import { Profile } from 'selenium-webdriver/firefox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-management',
  templateUrl: './dash-management.component.html',
  styleUrls: ['./dash-management.component.css']
})
export class DashManagementComponent implements OnInit {

  profile:Array<Profile>;
  constructor(private auth:Auth0ServiceService,private router:Router) { auth.handleAuthentication();

  
  }

  ngOnInit() {

    
      
    setTimeout(() => {
      Common.Dlog(this.auth.getprofile);
      this.profile=this.auth.getprofile;      
    }, 2000);  
      console.log(this.profile)
      
    
  }

}
