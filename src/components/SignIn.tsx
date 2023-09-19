import { useForm, SubmitHandler } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { AppContext } from "../App";
import { useContext, useState } from "react";
import { signInUser } from "../api/auth";


export type Inputs = {
  username: string,
  password: string
}

interface ErrorDivProps {
  name: keyof Inputs;
}

interface Props {
  showSignup: (show: boolean) => void
}

export function SignIn({ showSignup }: Props) {

  const { handleSignIn } = useContext(AppContext)

  const [hasError, setHasError] = useState<boolean>(false)

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({
    criteriaMode: "all",
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const ErrorDiv = ({name}: ErrorDivProps) => {
    return (
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p role="alert" className="text-red-600 text-sm font-medium">{message}</p>}
      />
    )
  }

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const signInSucceed = await signInUser(data)
    if (signInSucceed) {
      handleSignIn()
    } else {
      setHasError(true)
      reset()
    }
  }

  return (
    <div className='max-w-screen-sm sm:max-w-xs self-center w-full'>
      <p role="heading" aria-level={1} className='text-xl sm:text-2xl font-semibold text-grey-800'>Hello, Welcome!</p>
      <p className='text-grey-500 mt-2'>Enter username and password to sign in.</p>
      <form onSubmit={handleSubmit(onSubmit)} className='py-8 flex flex-col gap-4'>
        { hasError && <p className="text-sm text-red-600 font-medium">Username or password is incorrect</p>}
        <label htmlFor="username" className='text-grey-800'> 
          Username <span className="text-red-600 ">*</span>
        </label>
        <input type="text" id="username" autoComplete="on" role="textbox" aria-label="username"
          aria-invalid={errors.username ? "true" : "false"}
          {...register("username", {
            required: "This is required"
          })}
          className={`form-input rounded-md border-grey-300 ${errors.username ? 'focus:ring-0 focus:border-red-500'
            :'focus:ring-0 focus:border-grey-600 focus:shadow-inner' }`} />
        <ErrorDiv name="username" />

        <label htmlFor="password" className='text-grey-800'> 
          Password <span className="text-red-600 ">*</span>
        </label>
        <input type="password" id="password" autoComplete="on" role="textbox" aria-label="password"
          aria-invalid={errors.password ? "true" : "false"}
          {...register("password", {
            required: "This is required"
          })}
          className={`form-input rounded-md border-grey-300 ${errors.password ? 'focus:ring-0 focus:border-red-500'
            :'focus:ring-0 focus:border-grey-600 focus:shadow-inner' }`} />
        <ErrorDiv name="password" />

        <input type="submit" value="Sign In" aria-label="submit"
          className='form-input mt-4 border-none rounded-md text-red-100 bg-red-500 cursor-pointer focus:ring-0 active:bg-red-600'/>
      </form>
      <p className='text-center mt-8 text-grey-500 text-sm'>Don't have an account?&nbsp;&nbsp;
        <button className='text-grey-800 font-semibold text-sm cursor-pointer' onClick={ () => showSignup(true) }>Sign Up</button>
      </p>
    </div>
  )

}