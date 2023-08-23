import { useForm, SubmitHandler } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { useState } from "react";
import { SERVER_URL } from "../../util/constant";



type Inputs = {
  oldPassword: string,
  password: string,
  passwordConfirmation: string
}

interface ErrorDivProps {
  name: keyof Inputs;
}

interface FormErrorType {
  msg: string
}

export function Security() {

  const [success, setSuccess] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<FormErrorType[]>([])

  const {
    register,
    watch,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({
    criteriaMode: "all",
    defaultValues: {
      oldPassword: '',
      password: '',
      passwordConfirmation: ''
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch(`${SERVER_URL}/users/password`, {
        method: "PUT",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      if (res.status === 200) {
        console.log('password changed!')
        setSuccess(true)
        setFormErrors([])
        reset()
      } else {
        console.log('failed change pwd')
        const msg = await res.json()
        setSuccess(false)
        setFormErrors(msg)
        reset()
      }
    } catch(e) {
      console.log('error when changing password:' + e)
    }
  }
 
  return (
    <>
      <p className="text-lg sm:text-xl text-grey-800 mb-6 sm:mb-10 font-semibold">Change Password</p>
      <form onSubmit={ handleSubmit(onSubmit) } className="flex flex-col gap-4 max-w-xs text-xs sm:text-sm">
        <label htmlFor="old_pwd" className="text-grey-800">Old Password <span className="text-red-600 ">*</span></label>
        <input type="password" id="old_pwd" autoComplete="true"
          aria-invalid={errors.password ? "true" : "false"}
          {...register("oldPassword", {
            required: "This is required",
          })}
          className={`form-input rounded-md border-grey-300 ${errors.oldPassword ? 'focus:ring-0 focus:border-red-500'
            :'focus:ring-0 focus:border-grey-600 focus:shadow-inner' }`} />
        <ErrorDiv name="oldPassword" />

        <label htmlFor="password" className="text-grey-800">New Password <span className="text-red-600 ">*</span></label>
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

        <label htmlFor="confirm_pwd" className="text-grey-800">Confirm New Password <span className="text-red-600 ">*</span></label>
        <input type="password" id="confirm_pwd" autoComplete="true"
          aria-invalid={errors.passwordConfirmation ? "true" : "false"}
          {...register("passwordConfirmation", {
            required: "This is required",
            validate: (val: string) => {
              if (watch("password") !== val) {
                return "Passwords do not match"
              }
            }
          })}
          className={`form-input rounded-md border-grey-300 ${errors.passwordConfirmation ? 'focus:ring-0 focus:border-red-500'
            :'focus:ring-0 focus:border-grey-600 focus:shadow-inner' }`} />
        <ErrorDiv name="passwordConfirmation" />

        { success ? <p className="text-green">New password saved successfully!</p>
          : 
          <ul className="text-red-600 font-medium text-sm">
            { formErrors.map(err => <li>{err.msg}</li>)}
          </ul>
        }

        <input type="submit" value='Save' className="form-input text-xs sm:text-sm font-medium mt-2 sm:mt-4 border-none rounded-md text-red-100 bg-red-500 cursor-pointer focus:ring-0 active:bg-red-600" />
      </form>
      
    </>
  )
}