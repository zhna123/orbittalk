import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {vi} from "vitest"
import { Register } from "../Register";
import * as user from "../../api/user";

const spyRegisterUser = vi.spyOn(user, "registerUser").mockImplementation(async() => [true, {}])

describe("register page", () => {
  afterAll(() => {
    spyRegisterUser.mockRestore()
  })
  it("renders form fields", () => {
    render(<Register showSignup={() => {}}/>)
    expect(screen.getByRole("textbox", {name: "username"})).toBeInTheDocument()
    expect(screen.getByRole("textbox", {name: "password"})).toBeInTheDocument()
    expect(screen.getByRole("textbox", {name: "confirm password"})).toBeInTheDocument()
    expect(screen.getByRole("textbox", {name: "email"})).toBeInTheDocument()
    expect(screen.getByRole("button", {name: "submit"})).toBeInTheDocument()
  })
  it("validates form fields - missing email", async () => {
    const user = userEvent.setup();
    render(<Register showSignup={() => {}}/>)
    await user.type(
      screen.getByRole("textbox", { name: "username" }), "Jessica"
    );
    await user.type(
      screen.getByRole("textbox", { name: "password" }), "abcdefgh"
    );
    await user.type(
      screen.getByRole("textbox", { name: "confirm password" }), "abcdefgh"
    );
    await user.click(screen.getByRole("button", { name: "submit" }));
    expect(screen.getAllByRole("alert")).toHaveLength(1);
    expect(spyRegisterUser).not.toHaveBeenCalled()
  })
  it("validates form fields - passwords do not match", async () => {
    const user = userEvent.setup();
    render(<Register showSignup={() => {}}/>)
    await user.type(
      screen.getByRole("textbox", { name: "username" }), "Jessica"
    );
    await user.type(
      screen.getByRole("textbox", { name: "password" }), "abcdefgh"
    );
    await user.type(
      screen.getByRole("textbox", { name: "confirm password" }), "12345"
    );
    await user.type(
      screen.getByRole("textbox", { name: "email" }), "ab@gmail.com"
    );
    await user.click(screen.getByRole("button", { name: "submit" }));
    expect(screen.getAllByRole("alert")).toHaveLength(1);
    expect(spyRegisterUser).not.toHaveBeenCalled()
  })
  it("validates form fields - all pass", async () => {
    const user = userEvent.setup();
    render(<Register showSignup={() => {}}/>)
    await user.type(
      screen.getByRole("textbox", { name: "username" }), "Jessica"
    );
    await user.type(
      screen.getByRole("textbox", { name: "password" }), "abcdefgh"
    );
    await user.type(
      screen.getByRole("textbox", { name: "confirm password" }), "abcdefgh"
    );
    await user.type(
      screen.getByRole("textbox", { name: "email" }), "abc@gmail.com"
    );
    await user.click(screen.getByRole("button", { name: "submit" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument()
    expect(spyRegisterUser).toHaveBeenCalled()
  })
})