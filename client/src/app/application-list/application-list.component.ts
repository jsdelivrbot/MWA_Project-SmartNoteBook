import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApplicationService } from '../_services/application.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss'],
  providers:[ApplicationService]
})
export class ApplicationListComponent implements OnInit {
  public applications;
  public application;
  //@ViewChild("modalForm") modalForm : ModalOptionsComponent;
  
  
  constructor(private _applicationService : ApplicationService, private router : Router) { 
    this.getApplications();
  }

  ngOnInit() {
    this.getApplications();
    //console.log(this.applications);
  }

  openModalForm(){
    //this.modalForm.openLg('Cross click');
  }


  applicationFormSubmit(formData){
    this.application = formData;
    this.createApplication();
      console.log("Here in Parent",formData);
  }

  getApplications(){
    console.log('here');
    //this.applications = [{"followUps":["First interview","Second Interview"],"_id":"5b0238caab2e2c150c52c5b7","companyName":"Tesla","city":"SF","postWebsite":"ww.gogle.com","jobDescription":"Developer","sourceOfJobPosting":"","email":"google.gmail.com","contactName":"Ed sheeran","phoneNumber":"87653","resumeVersion":"1.0.0","notes":"Going good","__v":0},{"followUps":["First interview","Second Interview"],"_id":"5b0239146d6a521a88bb7908","companyName":"Google","city":"SF","postWebsite":"ww.gogle.com","jobDescription":"Developer","sourceOfJobPosting":"","email":"google.gmail.com","contactName":"Ed sheeran","phoneNumber":"87653","resumeVersion":"1.0.0","notes":"Going good","__v":0},{"followUps":["First interview","Second Interview"],"_id":"5b0239156d6a521a88bb7909","companyName":"Google","city":"SF","postWebsite":"ww.gogle.com","jobDescription":"Developer","sourceOfJobPosting":"","email":"google.gmail.com","contactName":"Ed sheeran","phoneNumber":"87653","resumeVersion":"1.0.0","notes":"Going good","__v":0},{"followUps":["First interview","Second Interview"],"_id":"5b0245f4d02eb31fb4601518","companyName":"Google","city":"SF","postWebsite":"ww.gogle.com","jobDescription":"Developer","sourceOfJobPosting":"","email":"google.gmail.com","contactName":"Ed sheeran","phoneNumber":"87653","resumeVersion":"1.0.0","notes":"Going good","__v":0},{"followUps":["First interview","Second Interview"],"_id":"5b024fd0ea53ab20c4df49fe","companyName":"Intel","city":"SF","postWebsite":"ww.gogle.com","jobDescription":"Developer","sourceOfJobPosting":"","email":"google.gmail.com","contactName":"Ed sheeran","phoneNumber":"87653","resumeVersion":"1.0.0","notes":"Going good","__v":0}];
      this._applicationService.getApplications()
          .subscribe(
            data => {this.applications = data;
             console.log("Data", this.applications);
           },
            err => console.log(err),
            () => console.log('Loading done')
          );
          
  }

   createApplication(){
     this._applicationService.createApplication(this.application)
         .subscribe(
           data => { this.getApplications(); console.log('added');return true; },
           err => { Observable.throw(err);console.log(err);
           }
         );
   }

  search(el){
    //console.log(el.target.value);
    this._applicationService.searchApplication(el.target.value)
        .subscribe(data => {this.applications = data});
  }

  editApplication(app){
     console.log('here', app);
      this.router.navigate([`dashboard/edit/${app._id}`]);
  }
  
  onSubmit()
  {
    this._applicationService.updateApplication(this.application)
        .subscribe(
          data => { this.getApplications(); return true; },
          err => { Observable.throw(err);
          }
        );
  }

   deleteApplication(app){
     console.log("Deleteing", app);
     if(confirm('Are you sure you want to delete?')){
       this._applicationService.deleteApplication(app)
         .subscribe(
           data => { this.getApplications(); return true; },
           err => { Observable.throw(err);
           }
         );
     }
   }

}
