import {vi} from "vitest"
import { Friends } from "../Friends";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


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

vi.mock('../../../hooks/useFriendList', () => ({ 
  useFriendList: () => {
    const friendList = [friend1, friend2]
    const isLoading = false
    const addFriend = vi.fn()
    return {friendList, isLoading, addFriend}
  }
})) 

vi.mock('../AddFriendModule', () => ({
  AddFriendModule: () => {
    return <div data-testid="add-friend">Add Friend Module</div>
  }
}))


describe("friend list", () => {
  afterAll(() => {
    vi.restoreAllMocks()
  })
  it ("displays users' friends", () => {
    render(<Friends />)
    expect(screen.getByText("jackson screen name")).toBeInTheDocument()
    expect(screen.getByText("john screen name")).toBeInTheDocument()
  })
  it ("shows add friends module after the user clicks add icon", async () => {
    const user = userEvent.setup();
    render(<Friends />)
    const addButton = screen.getByRole("button", {name: "add"})
    await user.click(addButton)
    expect(screen.getByTestId("add-friend")).toBeInTheDocument()
  })
})