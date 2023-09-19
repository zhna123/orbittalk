import { render, screen } from "@testing-library/react";
import { RegisterFeedbackModule } from "../RegisterFeedbackModule";


describe("register feedkback module", () => {
  it("shows success message when user registration succeed", () => {
    render(<RegisterFeedbackModule success={true} registerErr={[]} closeModule={() => {}} showSignup={() => {}}/>)
    expect(screen.getByText("You've successfully signed up!")).toBeInTheDocument()
    expect(screen.getByRole("button", {name: "Click here to sign in."})).toBeInTheDocument()
  })
  it("displays erros when user registration failed", () => {
    render(<RegisterFeedbackModule success={false} registerErr={[{msg: 'user already exists'}]} closeModule={() => {}} showSignup={() => {}}/>)
    expect(screen.queryByText("You've successfully signed up!")).not.toBeInTheDocument()
    expect(screen.getByText("Sign up failed due to the following error/errors:")).toBeInTheDocument()
    expect(screen.getByText("user already exists")).toBeInTheDocument()

    expect(screen.getByRole("button", {name: "Close"})).toBeInTheDocument()
  })
})