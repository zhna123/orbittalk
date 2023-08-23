import { useRef, useEffect, useState } from "react"
import { User } from "../../types";
import { useFriendList } from "../../hooks/useFriendList";


interface Props {
  openNewChatModule: (open: boolean) => void
  handleStartChat: (friend: User) => void
}

export function NewChatModule({openNewChatModule, handleStartChat}: Props) {

  const { friendList, isLoading } = useFriendList()
  
  const [query, setQuery] = useState<string>('');

  // select friends
  const [selectedFriend, setSelectedFriend] = useState<User>()

  const moduleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const moduleElement = moduleRef.current;
    const handleClickOutside = (e: MouseEvent) => {
      if (moduleElement && !moduleElement.contains(e.target as Node)) {
        openNewChatModule(false);
      }
    }
    if (moduleElement) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  })

  const friendsListFilter = (friends: (User|null)[]) => {
    const filteredFriends = friends.filter(friend => {      
      // Check if every character in the query exists in the friend string
      return [...query].every(char => friend!.screen_name.includes(char));
    });
    return filteredFriends;
  }
  
  return (
    <>
      <div className="bg-grey-100 bg-opacity-60 fixed h-full w-full top-0 left-0">
      <div ref={moduleRef} className="p-4 bg-white max-w-xs border-none rounded-md shadow-lg relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <input type="search" name="search" id="search" 
          className="form-input w-full border-x-0 border-t-0 border-b-1 border-grey-200 rounded-tl-md rounded-tr-md text-grey-800 placeholder:text-grey-600 focus:ring-0 focus:border-red-300" 
          placeholder="Type name here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}/>
       
        <p className="px-2 py-4 text-grey-600">Frequent</p>
        <ul className="text-grey-800 max-h-36 overflow-auto">
          {
            isLoading ? <li className="text-grey-800">Loading friends...</li> :
            (
              friendsListFilter(friendList).length === 0 ? <li className="leading-8 px-4 py-1">No result found</li>
              : 
              friendsListFilter(friendList).map(f => {
                return <li key={f!._id} 
                className={`leading-8 px-4 py-1 hover:bg-grey-200 rounded-md cursor-pointer ${selectedFriend?._id === f?._id ? 'bg-grey-300 hover:bg-grey-300' : ''}`} onClick={() => setSelectedFriend(f!)}>
                  {f!.screen_name}
                </li>
              })
            )       
          }
          
        </ul>
        <div className="h-0.5 bg-grey-200 m-auto"></div>
        <div className="py-4">
          {
            selectedFriend ? 
            <button className="form-input text-red-100 bg-red-500 focus:ring-0 active:bg-red-600 border-none rounded-md ml-auto mr-2 block" 
              onClick={ () => handleStartChat(selectedFriend)}>
              Start Chat
            </button>
            :
            <button className="form-input text-grey-100 border-none rounded-md ml-auto mr-2 block bg-grey-400 disabled">Start Chat</button>
          }
        </div>
      </div>
      </div>
      
    </>
  )
}
