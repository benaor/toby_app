import { SessionFactory } from "../models/Session.factory";
import { UserForm } from "./UserForm";

describe("UserForm", () => {
  it("should return the user form", () => {
    const userForm = SessionFactory.USER_FORM();
    const form = new UserForm(userForm);
    expect(form.get()).toEqual(userForm);
  });

  it("should throw an error if the email is invalid", () => {
    const userForm = SessionFactory.USER_FORM({ email: "test" });
    const form = new UserForm(userForm);
    expect(() => form.get()).toThrow("Invalid email");
  });

  it("should throw an error if the password is invalid", () => {
    const userForm = SessionFactory.USER_FORM({ password: "123" });

    const form = new UserForm(userForm);
    expect(() => form.get()).toThrow("Password must be at least 6 characters");
  });

  it("should throw an error if the first name is invalid", () => {
    const userForm = SessionFactory.USER_FORM({ firstName: "a" });

    const form = new UserForm(userForm);

    expect(() => form.get()).toThrow(
      "First name must be at least 2 characters",
    );
  });

  it("should throw an error if the last name is invalid", () => {
    const userForm = SessionFactory.USER_FORM({ lastName: "a" });

    const form = new UserForm(userForm);

    expect(() => form.get()).toThrow("Last name must be at least 2 characters");
  });
});
