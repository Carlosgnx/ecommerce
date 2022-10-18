import { Component } from '@angular/core';
import {} from '@angular/fire/compat/auth';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  //Variables
  loginError: boolean = false;

  formRegister: FormGroup = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [this.passwordMatchingValidator()],
    }
  );

  formLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    keepSession: [true],
  });

  /**
   * Este metodo se utiliza con NgIf para validar si un campo de un formulario cumple los requisitos.
   * @param field El campo que se desea validar.
   * @param form El formulario que contiene el campo que se desea validar.
   * @returns boolean
   */
  isFieldInvalid(field: string, form: FormGroup): boolean | null {
    return form.get(field)!.errors && form.get(field)!.touched;
  }

  /**
   * Este metodo se encarga de validar que las contraseñas en el registro sean iguales.
   * @returns ValidatorFn
   */
  passwordMatchingValidator() {
    return (form: AbstractControl): ValidationErrors | null => {
      const password = form.get('password')?.value;
      const confirmPassword = form.get('confirmPassword')?.value;
      if (
        password.length >= 6 &&
        confirmPassword.length > 0 &&
        password != confirmPassword
      ) {
        return { passwordNotMatching: true };
      }
      return null;
    };
  }

  /**
   * Este metodo registra un nuevo usuario en firebase.
   */
  register() {
    const email = this.formRegister.get('email')?.value;
    const password = this.formRegister.get('password')?.value;
    this.authService
      .register(email, password)
      .then(() => this.router.navigateByUrl(''))
      .catch((err) => console.log(err));
  }

  /**
   * Este metodo inicia sesion en firebase y define la persistencia de la sesion dependiendo que haya elegido el usuario.
   */
  login() {
    const email = this.formLogin.get('email')?.value;
    const password = this.formLogin.get('password')?.value;
    const persistence = this.formLogin.get('keepSession')?.value
      ? 'local'
      : 'session';
    this.authService
      .login(email, password)
      .then(() => {
        this.authService.setPersistence(persistence);
        this.router.navigateByUrl('');
      })
      .catch((err) => {
        console.log(err);
        this.loginError = true;
      });
  }
}
