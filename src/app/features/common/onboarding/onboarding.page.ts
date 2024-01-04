import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdService } from 'src/app/services/bd.service';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  constructor(private router:Router, private bd: BdService, private storage: Storage) { }
deja:any
  ngOnInit() {
    this.deja= this.storage.get("deja")
    if(!this.deja){
      this.bd.getNiveaux().subscribe(rep => {
        this.storage.set("niveaux",rep)
      })
      this.bd.getCategories().subscribe(rep => {
        this.storage.set("categories",rep)
      })
      this.bd.getListQuestions().subscribe(rep => {
        this.storage.set("questions",rep)
      })
      this.bd.getListReponses().subscribe(rep => {
        this.storage.set("reponses",rep)
      })
      this.storage.set("deja",true)
    }
    

  }

  getPage(){
     this.router.navigate(["profile"]);

  }

}
