import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { Security } from "../Security"
import {vi} from "vitest"
import * as user from "../../../api/user";


const spyChangePassword = vi.spyOn(user, "changePassword").mockImplementation(async() => [true, []])

describe("security page", () => {
  afterEach(() => {
    spyChangePassword.mockClear()
  })
  afterAll(() => {
    spyChangePassword.mockRestore()
  })
  it("renders fields for password changing", () => {
    render(<Security />)
    expect(screen.getByRole("heading").textContent).toMatch("Change Password")
    expect(screen.getByRole("textbox", {name: "old password"})).toBeInTheDocument()
    expect(screen.getByRole("textbox", {name: "new password"})).toBeInTheDocument()
    expect(screen.getByRole("textbox", {name: "confirm password"})).toBeInTheDocument()
    expect(screen.getByRole("button", {name: "Save"})).toBeInTheDocument()
  })
  it("validates form fields - all pass", async () => {
    const user = userEvent.setup();
    render(<Security />)
    await user.type(
      screen.getByRole("textbox", { name: "old password" }), "abcdefgh"
    );
    await user.type(
      screen.getByRole("textbox", { name: "new password" }), "abcdefghi"
    );
    await user.type(
      screen.getByRole("textbox", { name: "confirm password" }), "abcdefghi"
    );
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument()
    expect(spyChangePassword).toHaveBeenCalled()
  })
  it("validates form fields - passwords do not match", async () => {
    const user = userEvent.setup();
    render(<Security />)
    await user.type(
      screen.getByRole("textbox", { name: "old password" }), "abcdefgh"
    );
    await user.type(
      screen.getByRole("textbox", { name: "new password" }), "abcdefghi"
    );
    await user.type(
      screen.getByRole("textbox", { name: "confirm password" }), "abcdefghij"
    );
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(screen.getAllByRole("alert")).toHaveLength(1);
    expect(spyChangePassword).not.toHaveBeenCalled()
  })
  it("validates form fields - password is less than 8 characters", async () => {
    const user = userEvent.setup();
    render(<Security />)
    await user.type(
      screen.getByRole("textbox", { name: "old password" }), "abcdefgh"
    );
    await user.type(
      screen.getByRole("textbox", { name: "new password" }), "abcd"
    );
    await user.type(
      screen.getByRole("textbox", { name: "confirm password" }), "abcd"
    );
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(screen.getAllByRole("alert")).toHaveLength(1);
    expect(spyChangePassword).not.toHaveBeenCalled()
  })
})