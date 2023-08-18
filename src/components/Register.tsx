
interface Props {
  showSignup: (show: boolean) => void
}

export function Register(props: Props) {

  return (
    <div className='max-w-xs self-center w-full'>
      <p className='text-2xl text-center font-semibold text-grey-800'>Create your account</p>
      <form className='py-8 flex flex-col gap-2'>
        <label htmlFor="username" className='text-grey-800'> 
          Username
        </label>
        <input type="text" name="username" id="username" className='form-input rounded-md border-grey-300' />
        <label htmlFor="password" className='text-grey-800'> 
          Password
        </label>
        <input type="password" name="password" id="password" className='form-input rounded-md border-grey-300' />
        <label htmlFor="confirmPwd" className='text-grey-800'> 
          Confirm password
        </label>
        <input type="password" name="confirmPwd" id="confirmPwd" className='form-input rounded-md border-grey-300' />
        <label htmlFor="password" className='text-grey-800'> 
          Email
        </label>
        <input type="email" name="email" id="email" className='form-input rounded-md border-grey-300' />
        <input type="submit" value="Sign Up" className='form-input mt-8 border-none rounded-md text-red-100 bg-red-500'/>
      </form>
      <p className='text-center mt-4 text-grey-500 text-sm'>Already had an account?&nbsp;&nbsp;
        <span className='text-grey-800 font-semibold text-sm cursor-pointer' onClick={ () => props.showSignup(false) }>Sign In</span>
      </p>
    </div>
  )
}