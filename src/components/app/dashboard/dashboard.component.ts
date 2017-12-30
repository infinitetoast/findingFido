import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { PageService } from '../services/page.service';



@Component({
  templateUrl: 'dashboard.component.html',
  //styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pet: boolean;
  personNeeded: boolean;
  time: Date;
  date: Date;
  location: string;
  activities: any;
  profile: any;
  comingactivities: any;
  files: FileList;


  constructor(
    private router: Router,
    public authService: AuthService,
    private pageService: PageService
  ) { }

  ngOnInit() {
    if (this.authService.userProfile) {
      this.profile = this.authService.userProfile;
    } else {
      this.authService.getProfile((err, profile) => {
        this.profile = profile;
        console.log(profile.email)
        this.pageService.getDashboard(profile.email)
          .then(information => {
            this.comingactivities = information.activities;
            console.log('yep fired', information)
          })
      });
    }
  }

  onSelectFriend(): void {
    this.router.navigate(['/schedule']);
  }
  onSelectPet(): void {
    this.pet = true;
  }
  onSelect(): void {
    this.personNeeded = true;
    const activities = {
      time: this.time,
      date: this.date,
      location: this.location,
      profile: this.profile,
    }
    console.log(activities);
    this.pageService.postActivities(activities)
      .then(activities => console.log('yep fired', activities))
  }

  onChange(files: FileList) {
    this.files = files;
    console.log(this.files.length);
  }

  onSend(): void {
    if (this.files.length > 0) {
      let file: File = this.files[0];
      let formData: FormData = new FormData();
      formData.append('userpic', file, file.name);
      console.log(file);
      console.log(formData);
      this.pageService.postPhoto(file, formData)
        .then(file => console.log('yep fired', file))

    }
  }
} 

