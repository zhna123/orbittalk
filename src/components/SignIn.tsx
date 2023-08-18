
interface Props {
  showSignup: (show: boolean) => void
}

export function SignIn(props: Props) {

  return (
    <div className='max-w-xs self-center w-full'>
      <p className='text-2xl font-semibold text-grey-800'>Hello, Welcome!</p>
      <p className='text-grey-500 mt-2'>Enter username and password to sign in.</p>
      <form className='py-8 flex flex-col gap-4'>
        <label htmlFor="username" className='text-grey-800'> 
          Username
        </label>
        <input type="text" name="username" id="username" className='form-input rounded-md border-grey-300' />
        <label htmlFor="password" className='text-grey-800'> 
          Password
        </label>
        <input type="password" name="password" id="password" className='form-input rounded-md border-grey-300' />
        <input type="submit" value="Sign In" className='form-input mt-4 border-none rounded-md text-red-100 bg-red-500'/>
      </form>
      <p className='text-center mt-8 text-grey-500 text-sm'>Don't have an account?&nbsp;&nbsp;
        <span className='text-grey-800 font-semibold text-sm cursor-pointer' onClick={ () => props.showSignup(true) }>Sign Up</span>
      </p>
    </div>
  )

}