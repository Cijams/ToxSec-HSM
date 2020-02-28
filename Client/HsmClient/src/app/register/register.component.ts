import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpParams, HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router, } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  location: Location

  authStatus = "/register";
  isHidden = true;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private apiService: ApiService
  ) { 
    this.location = location;
  };
  
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userID: [''],
      password: ['']
    });
  }

  public onRegisterUser() {
    const url = 'http://localhost:8080/registerUser';
    this.http.get<string>(url,
      {
        params: new HttpParams().set('userID', this.registerForm.get('userID').value)
          .append('password', this.registerForm.get('password').value)
      },
    ).subscribe(
      res => {
        
        const returnKeys = Object.keys(res);
        const returnValues = Object.values(res);
        console.log(returnKeys);
        console.log(returnValues);
        
         if (!!returnValues[0]) {
          this.location.assign("crypto");
         }
         else {
           console.log("tes");
           this.isHidden = false;
         }
      },
    );
  }

}
