import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Este metodo se encarga de validar que las contraseñas en el registro sean iguales.
 * @returns ValidatorFn
 */
export function passwordMatchingValidator() {
  return (form: AbstractControl): ValidationErrors | null => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (!password || !confirmPassword) {
      return null;
    }
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
