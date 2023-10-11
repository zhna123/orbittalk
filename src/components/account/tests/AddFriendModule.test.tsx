import { render, screen } from "@testing-library/react";
import { AddFriendModule } from "../AddFriendModule";
import {vi} from "vitest"
import userEvent from "@testing-library/user-event";
import * as user from "../../../api/user"
import { AppContext, AppContextProps } from "../../../App";

const authUser = {
  _id: "userid",
  username: "Maggie",
  password: "pwd",
  email: "mg@gmail.com",
  screen_name: "maggie screen name",
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

const friend1 = {
  _id: "userid1",
  username: "Jackson",
  password: "pwd1",
  email: "jk@gmail.com",
  screen_name: "jackson screen name",
  avatar: Buffer.from("abc"),
  is_online: true,
  friends: []
}

const friend2 = {
  _id: "userid2",
  username: "John",
  password: "pwd2",
  email: "jn@gmail.com",
  screen_name: "john screen name",
  avatar: Buffer.from("abc"),
  is_online: true,
  friends: []
}
// new friend
const friend3 = {
  _id: "userid3",
  username: "Kai",
  password: "pwd3",
  email: "kai@gmail.com",
  screen_name: "kai screen name",
  avatar: Buffer.from("abc"),
  is_online: true,
  friends: []
}

vi.mock('../../../hooks/useFriendList', () => ({ 
  useFriendList: () => {
    const friendList = [friend1, friend2]
    const isLoading = false
    const addFriend = vi.fn()
    return {friendList, isLoading, addFriend}
  }
})) 

describe("test addFriendModule", () => {
  afterAll(() => {
    vi.restoreAllMocks()
  })

  it("renders search field", () => {
    render(<AddFriendModule openModule={()=>{}} handleAddFriend={()=>{}} />)
    expect(screen.getByRole("textbox", {name: "username"})).toBeInTheDocument()
    expect(screen.getByRole("button", {name: "Find"})).toBeInTheDocument()
  })
  it("validate required field", async () => {
    const user = userEvent.setup();
    render(<AddFriendModule openModule={()=>{}} handleAddFriend={()=>{}} />)
    const findBtn = screen.getByRole("button", {name: "Find"})
    await user.click(findBtn)
    expect(screen.getAllByRole("alert")).toHaveLength(1)
    expect(screen.getByRole("alert").textContent).toMatch("This is required")
  })
  it("renders new friend found by entering username", async() => {

    const spyFindUserByName = vi.spyOn(user, "findUserByName").mockImplementation(async() => friend3)

    const usr = userEvent.setup();

    const providerProps = {
      signIn: true,
      handleSignIn: vi.fn(),
      handleSignOut: vi.fn(),
      user: authUser,
      updateUserAvatar: vi.fn(),
      updateUserFriendList: vi.fn()
    }
    customRender(<AddFriendModule openModule={()=>{}} handleAddFriend={()=>{}} />, {providerProps})

    await usr.type(
      screen.getByRole("textbox", {name: "username"}), "Kai"
    )
    await usr.click(screen.getByRole("button", {name: "Find"}))
    expect(spyFindUserByName).toHaveBeenCalled()
    expect(screen.getByText("kai screen name")).toBeInTheDocument()
    expect(screen.getByRole("button", {name: "add"})).toBeInTheDocument()
    expect(screen.queryByText("No user found.")).not.toBeInTheDocument()
    spyFindUserByName.mockRestore()
  })
  it("renders existing friend after search without add button", async() => {

    const spyFindUserByName = vi.spyOn(user, "findUserByName").mockImplementation(async() => friend1)

    const usr = userEvent.setup();

    const providerProps = {
      signIn: true,
      handleSignIn: vi.fn(),
      handleSignOut: vi.fn(),
      user: authUser,
      updateUserAvatar: vi.fn(),
      updateUserFriendList: vi.fn()
    }
    customRender(<AddFriendModule openModule={()=>{}} handleAddFriend={()=>{}} />, {providerProps})

    await usr.type(
      screen.getByRole("textbox", {name: "username"}), "Kai"
    )
    await usr.click(screen.getByRole("button", {name: "Find"}))
    expect(spyFindUserByName).toHaveBeenCalled()
    expect(screen.getByText("jackson screen name")).toBeInTheDocument()
    expect(screen.queryByRole("button", {name: "add"})).not.toBeInTheDocument()
    expect(screen.queryByText("No user found.")).not.toBeInTheDocument()
    spyFindUserByName.mockRestore()
  })
  it("renders user not found", async() => {

    const spyFindUserByName = vi.spyOn(user, "findUserByName").mockImplementation(async() => null)

    const usr = userEvent.setup();
    render(<AddFriendModule openModule={()=>{}} handleAddFriend={()=>{}} />)

    await usr.type(
      screen.getByRole("textbox", {name: "username"}), "Pan"
    )
    await usr.click(screen.getByRole("button", {name: "Find"}))
    expect(spyFindUserByName).toHaveBeenCalled()
    expect(screen.queryByText("No user found.")).toBeInTheDocument()

    spyFindUserByName.mockRestore()
  })
})