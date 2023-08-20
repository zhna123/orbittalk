import { useForm, SubmitHandler } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { useState } from "react";
import { RegisterFeedbackModule } from "./RegisterFeedbackModule";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

type Inputs = {
  username: string,
  password: string,
  confirmPwd: string,
  email: string
}

interface ErrorDivProps {
  name: keyof Inputs;
}

interface Props {
  showSignup: (show: boolean) => void
}

export function Register({ showSignup }: Props) {

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [registerErr, setRegisterErr] = useState([])

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({
    criteriaMode: "all",
    defaultValues: {
      username: '',
      password: '',
      confirmPwd: '',
      email: ''
    }
  })

  const ErrorDiv = ({name}: ErrorDivProps) => {
    return (
      <ErrorMessage
            errors={errors}
            name={name}
            render={({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p key={type} role="alert" className="text-red-600 text-sm font-medium">{message}</p>
              ))
            }
      />
    )
  }

  const onSubmit: SubmitHandler<Inputs> = async(data: Inputs) => {
    console.log(data)
    try {
      const res = await fetch(`${SERVER_URL}/sign-up`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const msg = await res.json()
      console.log(msg)
      if (res.status === 201) {
        setFormSubmitted(true)
        setSuccess(true)
      } else {
        setFormSubmitted(true)
        setSuccess(false)
        setRegisterErr(msg)
      }
    } catch (e) {
      console.log("error when register:" + e)
    }
  }

  const closeModule = () => {
    setFormSubmitted(false)
  }

  return (
    <div className='max-w-xs self-center w-full'>
      <p className='text-2xl text-center font-semibold text-grey-800'>Create your account</p>
      <form onSubmit={ handleSubmit(onSubmit) } className='py-8 flex flex-col gap-2' noValidate>
        <label htmlFor="username" className='text-grey-800'> 
          Username <span className="text-red-600 ">*</span>
        </label>
        <input type="text" id="username" 
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
        <input type="password" id="password" autoComplete="true"
          aria-invalid={errors.password ? "true" : "false"}
          {...register("password", {
            required: "This is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          className={`form-input rounded-md border-grey-300 ${errors.password ? 'focus:ring-0 focus:border-red-500'
            :'focus:ring-0 focus:border-grey-600 focus:shadow-inner' }`} />
        <ErrorDiv name="password" />

        <label htmlFor="confirmPwd" className='text-grey-800'> 
          Confirm password <span className="text-red-600 ">*</span>
        </label>
        <input type="password" id="confirmPwd" autoComplete="true"
          aria-invalid={errors.confirmPwd ? "true" : "false"}
          {...register("confirmPwd", {
            required: "This is required",
            validate: (val: string) => {
              if (watch("password") !== val) {
                return "Passwords do not match"
              }
            }
          })}
          className={`form-input rounded-md border-grey-300 ${errors.confirmPwd ? 'focus:ring-0 focus:border-red-500'
            :'focus:ring-0 focus:border-grey-600 focus:shadow-inner' }`} />
        <ErrorDiv name="confirmPwd" />

        <label htmlFor="password" className='text-grey-800'> 
          Email <span className="text-red-600 ">*</span>
        </label>
        <input type="email" id="email" 
          aria-invalid={errors.email ? "true" : "false"}
          {...register("email", {
            required: "This is required",
            pattern: {
              value: /.+@.+\..+/,
              message: "Email is not valid"
            }
          })}
          className={`form-input rounded-md border-grey-300 ${errors.email ? 'focus:ring-0 focus:border-red-500'
            :'focus:ring-0 focus:border-grey-600 focus:shadow-inner' }`} />
        <ErrorDiv name="email" />

        <input type="submit" value="Sign Up" className='form-input mt-8 border-none rounded-md text-red-100 bg-red-500 cursor-pointer focus:ring-0 active:bg-red-600'/>
      </form>
      <p className='text-center mt-4 text-grey-500 text-sm'>Already had an account?&nbsp;&nbsp;
        <span className='text-grey-800 font-semibold text-sm cursor-pointer' onClick={ () => showSignup(false) }>Sign In</span>
      </p>
      { formSubmitted && <RegisterFeedbackModule success={ success } registerErr = { registerErr } closeModule = { closeModule }/> }
    </div>
  )
}