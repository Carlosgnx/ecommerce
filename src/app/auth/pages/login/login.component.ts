import { Component, ElementRef, ViewChild } from '@angular/core';
import {} from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user.interfaces';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { passwordMatchingValidator } from '../../validators/register.validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  //**Variables */

  @ViewChild('loginEmailInput') loginEmailInputRef!: ElementRef;

  loginError: boolean = false;

  registerForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(1)]],
      lastname: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [passwordMatchingValidator()],
    }
  );

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    keepSession: [true],
  });

  /**Functions */

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
   * Este metodo registra un nuevo usuario en firebase auth para luego registrar sus datos en firestore database.
   */
  register() {
    this.userService.loading = true;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    //Este objeto se registrara en la base de datos.
    const user: User = {
      name: this.registerForm.get('name')?.value,
      lastname: this.registerForm.get('lastname')?.value,
    };
    this.authService
      .register(email, password)
      .then(async (auth) => {
        //Creamos el documento en la DB
        await this.userService.createUser(auth.user.uid, user);
        this.authService.logout();
        this.registerForm.reset();
        this.loginEmailInputRef.nativeElement.focus();
        this.userService.loading = false;
        this.toastr.success(
          'Usuario registrado, ya puedes iniciar sesión.',
          undefined,
          {
            timeOut: 2000,
          }
        );
      })
      .catch((err) => console.log(err));
  }

  /**
   * Este metodo inicia sesion en firebase auth y define la persistencia de la sesion dependiendo que haya elegido el usuario.
   */
  login() {
    this.userService.loading = true;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    const persistence = this.loginForm.get('keepSession')?.value
      ? 'local'
      : 'session';
    this.authService
      .login(email, password)
      .then((auth) => {
        this.authService.setPersistence(persistence);
        this.userService.getUserData(auth.user.uid).subscribe((res) => {
          //userData contiene toda la información del usuario.
          const userData = res.data();
          this.userService.setUserSession(userData);
          this.router.navigateByUrl('');
          this.loginForm.enable;
          this.userService.loading = false;
        });
      })
      .catch((err) => {
        console.log(err);
        this.loginError = true;
        this.userService.loading = false;
      });
  }
}
