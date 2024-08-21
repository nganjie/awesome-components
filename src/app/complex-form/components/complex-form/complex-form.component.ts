import { V } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { ComplexFormService } from '../../services/complex-form.service';
import { validValidator } from '../../validators/valid.validator';
import { confirmEqualValidator } from '../../validators/confirm-equal.validator';

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrl: './complex-form.component.scss'
})
export class ComplexFormComponent implements OnInit{

  loading=false;
  mainForm!:FormGroup;
  personalInfoForm!:FormGroup;
  contactPreferenceCtrl!:FormControl;
  emailCtrl!:FormControl;
  confirmEmailCtrl!:FormControl;
  emailForm!:FormGroup
  phoneCtrl!:FormControl;
  passwordCtrl!:FormControl;
  confirmPasswordCtrl!:FormControl;
  loginInfoForm!:FormGroup;
  showEmailCtrl$!:Observable<boolean>;
  showPhoneCtrl$!:Observable<boolean>;
  showEmailError$!:Observable<boolean>;
  showPasswordError$!:Observable<boolean>;


  constructor(private formBuilder:FormBuilder,private complexFormServices:ComplexFormService){}

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservable();
  }
  private initMainForm():void{
    this.mainForm =this.formBuilder.group({
      personalInfo:this.personalInfoForm,
      contactPreference:this.contactPreferenceCtrl,
      email:this.emailForm,
      phone:this.phoneCtrl,
      loginInfo:this.loginInfoForm
    })
  }
  private initFormControls():void{
    this.personalInfoForm=this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
    })
    this.contactPreferenceCtrl= this.formBuilder.control('email');
    this.emailCtrl=this.formBuilder.control('');
    this.confirmEmailCtrl=this.formBuilder.control('');
    this.emailForm=this.formBuilder.group({
      email:this.emailCtrl,
      confirmEmail:this.confirmEmailCtrl
    },{
      validators:[confirmEqualValidator('email','confirmEmail')],
      updateOn:'blur'
    })
    this.phoneCtrl =this.formBuilder.control('');
    this.passwordCtrl=this.formBuilder.control('',Validators.required);
    this.confirmPasswordCtrl=this.formBuilder.control('',Validators.required);
    this.loginInfoForm=this.formBuilder.group({
      username:['',Validators.required],
      password:this.passwordCtrl,
      confirmPassword:this.confirmPasswordCtrl
    },{
      validators:[confirmEqualValidator('password','confirmPassword')],
      updateOn:'blur'
    })

  }
  private initFormObservable(){
    this.showEmailCtrl$=this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference==='email'),
      tap(showEmailCtrl =>this.setEmailValidators(showEmailCtrl))
      
    );
    this.showPhoneCtrl$=this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference ==='phone'),
      tap(showPhoneCtrl=>this.setPhoneValidators(showPhoneCtrl))
    );
    this.showEmailError$=this.emailForm.statusChanges.pipe(
      map(status => status==='INVALID' &&this.emailCtrl.value&&this.confirmEmailCtrl.value )
    );
    this.showPasswordError$=this.loginInfoForm.statusChanges.pipe(
      map(status =>status==='INVALID'&&this.passwordCtrl.value&&this.confirmPasswordCtrl.value&&this.loginInfoForm.hasError('confirmEqual'))
    )
  }
  private setEmailValidators(showEmailCtrl:boolean){
    {
      if(showEmailCtrl){
        this.confirmEmailCtrl.addValidators([Validators.required,Validators.email]);
        this.emailCtrl.addValidators([Validators.required,Validators.email]);
        
      }else{
        this.emailCtrl.clearValidators();
        this.confirmEmailCtrl.clearValidators();
      }
      this.emailCtrl.updateValueAndValidity();
      this.confirmEmailCtrl.updateValueAndValidity();
    }
  }
  private setPhoneValidators(showPhoneCtrl:boolean){
    {
      if(showPhoneCtrl){
        this.phoneCtrl.addValidators([Validators.required,Validators.minLength(10),Validators.maxLength(10)])
      }else{
        this.phoneCtrl.clearValidators();
      }
      this.phoneCtrl.updateValueAndValidity();
    }
  }
  onSubmitForm(){
    this.loading=true;
    this.complexFormServices.saveUserInfo(this.mainForm.value).pipe(
      tap(save =>{
        this.loading=false;
        if(save){
          this.resetForm();
        }else{
          console.log("echec de l'enregistrement")
        }
      })
    ).subscribe()
  }
  resetForm(){
    this.mainForm.reset();
    this.contactPreferenceCtrl.patchValue('email')
  }
  getFormControlErrorText(ctrl:AbstractControl){
    if(ctrl.hasError('required')){
      return "ce champ est réquis";
    }else if(ctrl.hasError('email')){
      return "merci d'entre une adresse mail valide"
    }else if(ctrl.hasError('minlength')){
      return 'Ce numéro de téléphone ne contient pas assez de chiffre'
    }else if(ctrl.hasError('maxlength')){
      return 'Ce numéro de téléphone contient trop de chiffre'
    }else{
      return 'Ce champ contient une erreur';
    }
  }
}
