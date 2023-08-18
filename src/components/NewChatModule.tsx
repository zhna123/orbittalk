
export function NewChatModule() {
  
  return (
    <>
      <div className="bg-red-100 bg-opacity-60 fixed h-full w-full top-0 left-0">
        <div className="bg-white max-w-xs border-none rounded-md shadow-lg relative top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <input type="search" name="search" id="search" className="form-input w-full border-x-0 border-t-0 border-b-1 border-grey-200 rounded-tl-md rounded-tr-md" placeholder="Type name here..."/>
          <p className="px-2 pt-4 text-grey-700">Frequent</p>
          <ul className="text-grey-800">
            <li className="leading-8 px-4 py-2 hover:bg-grey-200 cursor-pointer">January</li>
            <li className="leading-8 px-4 py-2 hover:bg-grey-200 cursor-pointer">Feburary</li>
            <li className="leading-8 px-4 py-2 hover:bg-grey-200 cursor-pointer">March</li>
            <li className="leading-8 px-4 py-2 hover:bg-grey-200 cursor-pointer">April</li>
          </ul>
          <div className="h-0.5 bg-grey-200 m-auto"></div>
          <div className="py-4">
            <button className="form-input text-red-100 bg-red-500 border-none rounded-md ml-auto mr-2 block">Start Chat</button>
          </div>
        </div>
      </div>
      
    </>
    

  )
}