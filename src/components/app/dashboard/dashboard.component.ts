import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { Router } from '@angular/router';
import { PageService } from '../services/page.service';
import { FormGroup  } from '@angular/forms';



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
  filesToUpload: Array<File>;


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
        this.pageService.getDashboard(profile.email)
          .then(information => {
            this.comingactivities = information.activities;
          })
      });
    }
    this.filesToUpload = [];
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
    this.pageService.postActivities(activities)
      .then(activities => console.log(''))
  }
  upload() {
    this.makeFileRequest("http://localhost:9000/photos", [], this.filesToUpload).then((result) => {
      console.log(result);
    }, (error) => {
      console.log(error);
    });
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      for (var i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], files[i].name);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }

  // onChange(files: FileList) {
  //   this.files = files;
  //   console.log(this.files.length);
  //   if (this.files.length > 0) {
  //     let file: File = this.files[0];
  //     let formData: FormData = new FormData();
  //     //formData.append('userpic', 'chris');
  //     formData.append('pic', file, file.name);
  //     console.log(file);
  //     this.pageService.postPhoto(file, formData)
  //       .then(res => console.log('fired', res))
  //   }
  // }  

  // onSend(): void {
  //   if (this.files.length > 0) {
  //     let file: File = this.files[0];
  //     let formData: FormData = new FormData();
  //     //formData.append('userpic', 'chris');
  //     formData.append('userpic', file, file.name);
  //     console.log(file);
  //     console.log(JSON.stringify(file));
  //     this.pageService.postPhoto(file, formData)
  //     .then(res=>console.log('fired', res))
 //}



  //   }
  // }
} 

