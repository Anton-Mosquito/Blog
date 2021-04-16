import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription, fromEvent } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { passwordValidator } from '../login/form/custom-validation/password';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('form') form!: HTMLFormElement;

  public emailControl!: FormControl;
  public passwordControl!: FormControl;
  public confirmPasswordControl!: FormControl;
  public nameControl!: FormControl;
  public surnameControl!: FormControl;
  public phoneControl!: FormControl;

  private stateName = '';
  private stateSurname = '';
  private stateEmail = '';
  private statePassword = '';
  private statePhone = '';

  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    this.emailControl = new FormControl(this.stateEmail, [Validators.required, Validators.email]);
    this.passwordControl = new FormControl(this.statePassword, [Validators.required, Validators.minLength(6), passwordValidator]);
    this.confirmPasswordControl = new FormControl(this.statePassword, [Validators.required,passwordValidator, this.validateAreEqual.bind(this)]);
    this.nameControl = new FormControl(this.stateName, [Validators.required, Validators.minLength(3)]);
    this.surnameControl = new FormControl(this.stateSurname, [Validators.required, Validators.minLength(3)]);
    this.phoneControl = new FormControl(this.statePhone, [Validators.required, Validators.pattern(/^\+380\d{3}\d{2}\d{2}\d{2}$/)]);

    this.subscription.add(this.emailControl.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.stateEmail = this.emailControl.value;
      }
    }));

    this.subscription.add(this.passwordControl.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.statePassword = this.passwordControl.value && this.confirmPasswordControl.value;
      }
    }));

    this.subscription.add(this.nameControl.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.stateName = this.nameControl.value;
      }
    }));

    this.subscription.add(this.nameControl.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.stateSurname = this.surnameControl.value;
      }
    }));

    this.subscription.add(this.phoneControl.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.statePhone = this.phoneControl.value;
      }
    }));
  }

  ngAfterViewInit(): void {
    this.subscription.add(fromEvent<Event>(this.form.nativeElement, 'submit').subscribe((e) => {
      if (this.stateEmail && this.statePassword && this.stateName && this.stateSurname && this.statePhone) {
        this.authService.registry({
          email: this.stateEmail,
          password: this.statePassword,
          name: this.stateName,
          surname: this.stateSurname,
          phone: this.statePhone
        })
      } else {
        console.log('Something went wrong!')
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private validateAreEqual(confirmPasswordControl: FormControl) {
    return this.passwordControl.value === confirmPasswordControl.value ? null : {
        NotEqual: true
    };
}
}
