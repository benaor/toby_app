import { IUserForm } from "../models/AuthUser.type";

export class UserForm {
  constructor(private userForm: IUserForm) {
    this.userForm = userForm;
  }

  private validateEmail(email: string) {
    if (!email.includes("@")) throw new Error("Invalid email");

    return this;
  }

  private validatePassword(password: string) {
    if (password.length < 6)
      throw new Error("Password must be at least 6 characters");

    return this;
  }

  private validateFirstName(firstName: string) {
    if (firstName.length < 2)
      throw new Error("First name must be at least 2 characters");

    return this;
  }

  private validateLastName(lastName: string) {
    if (lastName.length < 2)
      throw new Error("Last name must be at least 2 characters");

    return this;
  }

  get() {
    this.validateEmail(this.userForm.email)
      .validatePassword(this.userForm.password)
      .validateFirstName(this.userForm.firstName)
      .validateLastName(this.userForm.lastName);

    return this.userForm;
  }
}
