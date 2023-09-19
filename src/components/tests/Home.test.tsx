import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home } from "../Home";
import { AppContext, AppContextProps } from "../../App";
import {vi} from "vitest"


vi.mock('../main/ChatBoard', () => ({ 
  default: () => {
    return <div data-testid="chat-board">Chat Board</div>
  }, 
})) 

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

const customRender = (ui: React.ReactElement, {providerProps, ...renderOptions}:{providerProps: AppContextProps}) => {
  return render(
    <AppContext.Provider value={providerProps}>{ui}</AppContext.Provider>,
    renderOptions,
  )
}

describe("Home page", () => {
  afterAll(() => {
    vi.restoreAllMocks()
  })
  describe("switch between sign in and sign up", () => {
    it("shows sign in page by default", () => {
      render( <Home />)
      expect(screen.getByRole("heading").textContent).toMatch("Hello, Welcome!")
    })
    it("shows sign up page when user clicked on sign up link", async () => {
      const user = userEvent.setup();
      render(<Home />)
      const link = screen.getByRole("button", {name: "Sign Up"});
      await user.click(link)
      expect(screen.getByRole("heading").textContent).toMatch("Create your account")
    })
  })
  describe("sign in", () => {

    it("shows chat board if the user already signed in", () => {
      const providerProps = {
        signIn: true,
        handleSignIn: vi.fn(),
        handleSignOut: vi.fn(),
        user: authUser,
        updateUserAvatar: vi.fn(),
        updateUserFriendList: vi.fn()
      }
      customRender(<Home />, {providerProps})
      expect(screen.getByTestId("chat-board")).toBeInTheDocument();
    })
  })
})