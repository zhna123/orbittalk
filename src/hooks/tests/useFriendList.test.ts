import { useFriendList } from "../useFriendList";
import { renderHook } from "@testing-library/react";
import {vi} from "vitest"
import * as user from "../../api/user"

const friend1 = {
  _id: "friend1",
  username: "Jessie",
  password: "pwd",
  email: "js@gmail.com",
  screen_name: "jessie",
  avatar: Buffer.from("abc"),
  is_online: true,
  friends: []
}

const friend2 = {
  _id: "friend2",
  username: "Zoe",
  password: "pwd",
  email: "ze@gmail.com",
  screen_name: "zoe",
  avatar: Buffer.from("abc"),
  is_online: true,
  friends: []
}

vi.spyOn(user, "findFriends").mockImplementation(async() => [friend1, friend2])

describe("useFriendList hook", () => {
  it.skip("is empty initially", () => {
    const { result } = renderHook(useFriendList);
    expect(result.current.friendList).toEqual([])
  })
})