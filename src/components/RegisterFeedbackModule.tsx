import { redirect } from "react-router-dom"

interface Props {
  success: boolean
  registerErr: {msg: string}[]
  closeModule: () => void
  showSignup: (show: boolean) => void
}

export function RegisterFeedbackModule({ success, registerErr, closeModule, showSignup }: Props) {

  const signin = () => {
    closeModule()
    showSignup(false)
    redirect('/')
  }
  
  return (
    <>
      <div className="bg-red-100 bg-opacity-60 fixed h-full w-full top-0 left-0 flex justify-center items-center">
        <div className="bg-white w-1/2 h-1/2 text-center text-grey-800 p-12 rounded-md">
          {
            success ? <p className="font-medium text-xl pb-8">You've successfully signed up!</p> : 
              <div>
                <p className="font-medium text-xl pb-4">Sign up failed due to the following error/errors:</p>
                <ul className="text-red-600">{ registerErr.map(err => <li>{err.msg}</li>) }</ul>
                <p className="text-sm pt-8 pb-4">Close this window to try again.</p>
              </div>

          }

          {
            success ? <button className="font-semibold text-red-500 cursor-pointer underline" onClick={signin}>Click here to sign in.</button>
              : <button className="bg-red-500 text-red-100 py-1 px-4 rounded-md border-none" onClick={ closeModule }>Close</button>
          }
          
        </div>
      </div>
      
    </>
  )
}