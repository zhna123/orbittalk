import { render, screen } from "@testing-library/react";
import { AccountBoard } from "../AccountBoard";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import {
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import { Security } from "../Security";
import { Friends } from "../Friends";
import { Notifications } from "../Notifications";
import {vi} from "vitest"
import * as user from "../../../api/user"
import { Profile } from "../Profile";

vi.spyOn(user, "findFriends").mockImplementation(async() => [])

vi.mock('../Profile', () => ({ 
  Profile: () => {
    return <div data-testid="profile">My Profile</div>
  }, 
})) 

describe("account board", () => {
  it("renders account board", () => {
    const { container } = render(<BrowserRouter>
        <AccountBoard />
      </BrowserRouter>)
    expect(container).toMatchSnapshot()
  })
  it("should show profile by default", async () => {
    const routes = [
      {
        path: "/account",
        element: <AccountBoard />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ["/account"],
      initialIndex: 1,
    });
    render(<RouterProvider router={router} />);
    expect(screen.getByText("My Profile")).toBeInTheDocument()
  })
  it("should show correct tab content when user clicks on the tab navigation", async () => {
    const routes = [
      {
        path: "/account",
        element: <AccountBoard />,
        children: [
          {
            path: "",
            element:  <Profile />
          },
          {
            path: "security",
            element: <Security />
          },
          {
            path: "friends",
            element: <Friends />
          },
          {
            path: "notifications",
            element: <Notifications />
          }
        ]
      },
      
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/account"],
      initialIndex: 1,
    });
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    const tab_profile = screen.getByRole("tab", {name: "profile"})
    await user.click(tab_profile)
    expect(screen.getByTestId("profile").textContent).toMatch("My Profile")
    
    const tab_security = screen.getByRole("tab", {name: "security"})
    await user.click(tab_security)
    expect(screen.getByRole("heading").textContent).toMatch("Change Password")

    const tab_friends = screen.getByRole("tab", {name: "friends"})
    await user.click(tab_friends)
    expect(screen.getByRole("heading").textContent).toMatch("My Friends")

    const tab_notify = screen.getByRole("tab", {name: "notifications"})
    await user.click(tab_notify)
    expect(screen.getByRole("heading").textContent).toMatch("Notifications")
  })
})