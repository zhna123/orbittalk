
export const WelcomePanel = () => {
  return (
    <div className='bg-grey-100 rounded-md flex flex-col gap-8 items-center pt-28 grow'>
      <p className="text-lg sm:text-xl font-semibold text-grey-800">Welcome to Orbit Talk</p>
      <p className="text-grey-500 text-sm px-2 sm:text-base">Select a conversation, or start a new chat!</p>
    </div>
  )
}