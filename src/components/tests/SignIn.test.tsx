import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {vi} from "vitest"
import { SignIn } from "../SignIn";
import * as auth from "../../api/auth";

const spyLogInUser = vi.spyOn(auth, "signInUser").mockImplementation(async () => true)

describe("sign in page", () => {
  afterEach(() => {
    spyLogInUser.mockClear()
  })
  afterAll(() => {
    spyLogInUser.mockRestore()
  })
  it("renders form fields", () => {
    render(<SignIn showSignup={() => {}}/>)
    expect(screen.getByRole("textbox", {name: "username"})).toBeInTheDocument()
    expect(screen.getByRole("textbox", {name: "password"})).toBeInTheDocument()
    expect(screen.getByRole("button", {name: "submit"})).toBeInTheDocument()
    expect(screen.getByRole("button", {name: "Sign Up"})).toBeInTheDocument()
  })
  it("validates form fields - missing required value", async () => {
    const user = userEvent.setup();
    render(<SignIn showSignup={() => {}}/>)
    await user.type(
      screen.getByRole("textbox", { name: "username" }), "Jessica"
    );
    await user.click(screen.getByRole("button", { name: "submit" }));
    expect(screen.getAllByRole("alert")).toHaveLength(1);
    expect(spyLogInUser).not.toHaveBeenCalled()
  })
  it("validates form fields - all pass", async () => {
    const user = userEvent.setup();
    render(<SignIn showSignup={() => {}}/>)
    await user.type(
      screen.getByRole("textbox", { name: "username" }), "Jessica"
    );
    await user.type(
      screen.getByRole("textbox", { name: "password" }), "a3f^89$%"
    );
    await user.click(screen.getByRole("button", { name: "submit" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument()
    expect(spyLogInUser).toHaveBeenCalled()
  })
})