import { render } from "@testing-library/react";
import AccountHeader from "../AccountHeader";
import { BrowserRouter } from "react-router-dom";

const authUser = {
  _id: "userid",
  username: "Jackson",
  password: "pwd",
  email: "jk@gmail.com",
  screen_name: "jackson",
  avatar: Buffer.from("abc"),
  is_online: true,
  friends: []
}

describe("acount section in header", () => {
  it("renders account section", () => {
    const { container } = render(<BrowserRouter>
                                  <AccountHeader user={authUser} />
                                </BrowserRouter>)
    expect(container).toMatchSnapshot();
  })
})