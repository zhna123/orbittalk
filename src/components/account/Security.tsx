export function Security() {
  return (
    <>
      <p className="text-2xl text-grey-800 mb-10">Change Password</p>
      <form className="flex flex-col gap-4 max-w-xs">
        <label htmlFor="old_pwd" className="text-grey-800">Old Password</label>
        <input type="text" name="old_pwd" id="old_pwd" className="form-input rounded-md border-grey-300"/>

        <label htmlFor="new_pwd" className="text-grey-800">New Password</label>
        <input type="password" name="new_pwd" id="new_pwd" className="form-input rounded-md border-grey-300"/>

        <label htmlFor="confirm_pwd" className="text-grey-800">Confirm New Password</label>
        <input type="password" name="confirm_pwd" id="confirm_pwd" className="form-input rounded-md border-grey-300"/>

        <input type="submit" value='Save' className="form-input mt-4 border-none rounded-md text-red-100 bg-red-500" />
      </form>
      
    </>
  )
}