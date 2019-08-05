import { AbstractControl } from "@angular/forms";

export function validDateCheck(control: AbstractControl) {
  if (control.value && isNaN(+control.value)) {
    let parts = control.value.split("/");
    if (parts.length === 3) {
      return { validDate: !isNaN(+new Date(parts[2], parts[1], parts[0])) };
    } else {
      return { validDate: false };
    }
  }
}
