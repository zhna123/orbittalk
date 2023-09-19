import { render, screen } from "@testing-library/react";
import { AppContext, AppContextProps } from "../../App";
import {vi} from "vitest"
import { BrowserRouter } from "react-router-dom";
import { Header } from "../Header";

const mockAccountHeader = vi.fn()
vi.mock('../AccountHeader', () => ({ 
  default: (props) => {
    mockAccountHeader(props)
    return <div data-testid="account-header">Account Header</div>
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

describe("render header", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("shows user account section if user sigined in", () => {
    const providerProps = {
      signIn: true,
      handleSignIn: vi.fn(),
      handleSignOut: vi.fn(),
      user: authUser,
      updateUserAvatar: vi.fn(),
      updateUserFriendList: vi.fn()
    }
    customRender(<BrowserRouter>
                  <Header />
                </BrowserRouter>, {providerProps})
                
    expect(screen.getByTestId("account-header")).toBeInTheDocument();
    expect(mockAccountHeader).toHaveBeenCalledWith(
      expect.objectContaining({
        user: authUser
      })
    )
  })
  it("doesn't show user account section if user is not sigined in", () => {
    const providerProps = {
      signIn: false,
      handleSignIn: vi.fn(),
      handleSignOut: vi.fn(),
      user: null,
      updateUserAvatar: vi.fn(),
      updateUserFriendList: vi.fn()
    }
    customRender(<BrowserRouter>
                  <Header />
                </BrowserRouter>, {providerProps})
                
    expect(screen.queryByTestId("account-header")).not.toBeInTheDocument();
    expect(mockAccountHeader).not.toHaveBeenCalled()
  })
})