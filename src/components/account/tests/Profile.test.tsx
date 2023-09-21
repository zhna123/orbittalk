import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Profile } from "../Profile";
import { AppContext, AppContextProps } from "../../../App";
import {vi} from "vitest"

const authUser = {
  _id: "userid",
  username: "Jackson",
  password: "pwd",
  email: "jk@gmail.com",
  screen_name: "jackson screen name",
  avatar: Buffer.from("abc"),
  is_online: true,
  friends: []
}

const customRender = (ui: React.ReactElement, {providerProps, ...renderOptions}:{providerProps: AppContextProps}) => {
  return render(
    <AppContext.Provider value={providerProps}>{ui}</AppContext.Provider>,
    renderOptions,
  )
}

// need to mock createObjectURL due to https://github.com/vitest-dev/vitest/issues/3985
vi.spyOn(window.URL, "createObjectURL").mockImplementation(() => "http://fake.url");

describe("profile", () => {
  it("should display user information", () => {
    const providerProps = {
      signIn: true,
      handleSignIn: vi.fn(),
      handleSignOut: vi.fn(),
      user: authUser,
      updateUserAvatar: vi.fn(),
      updateUserFriendList: vi.fn()
    }
    customRender(<Profile />, {providerProps})
    expect(screen.getByText("Jackson")).toBeInTheDocument()
    expect(screen.getByText("jackson screen name")).toBeInTheDocument()
    expect(screen.getByText("jk@gmail.com")).toBeInTheDocument()
  })
  it("should enable upload button after user chose the file", async () => {
    const user = userEvent.setup();
    const providerProps = {
      signIn: true,
      handleSignIn: vi.fn(),
      handleSignOut: vi.fn(),
      user: authUser,
      updateUserAvatar: vi.fn(),
      updateUserFriendList: vi.fn()
    }
    customRender(<Profile />, {providerProps})
    expect(screen.getByRole("button", {name: "upload-disabled"})).toBeInTheDocument()

    const blob = new Blob(["abc"], { type: "image/png" })
    const testImageFile = new File([blob], "hello.png", {lastModified: 1534584790000});

    const fileInput = screen.getByLabelText("choose avatar")
    await user.upload(fileInput, testImageFile);
    expect(screen.getByRole("button", {name: "upload"})).toBeInTheDocument()
  })
})