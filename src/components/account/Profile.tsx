import Icon from '@mdi/react';
import { mdiPencil } from '@mdi/js';
import { mdiCircle } from '@mdi/js';
import AVATAR_DEFAULT from '../../assets/avatar-default.png'
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../App';
import { getAvatarDataUri } from '../../util/image';
import { SERVER_URL } from '../../util/constant';




export function Profile() {

  const { user, updateUserAvatar } = useContext(AppContext)

  const [selectedFile, setSelectedFile] = useState<File>()
  const [preview, setPreview] = useState<string>()

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
        setPreview(undefined)
        return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {

    if (!e.target.files || e.target.files.length === 0) {
        setSelectedFile(undefined)
        return
    }
    setSelectedFile(e.target.files[0])
  }

  const onUpload = async () => {
    const formData = new FormData()
    formData.append("avatar", selectedFile!)
    
    // upload avatar
    const res = await fetch(`${SERVER_URL}/users/avatar`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      body: formData,
    })
    const result = await res.json()
    if (res.status === 200) {
      console.log("upload succeed")
      updateUserAvatar(result.data)
      setSelectedFile(undefined)
    } else {
      console.log("upload error:" + result.error)
    }
  }

  const displayAvatar = () => {
    if (user!.avatar && !selectedFile) {
      return <img src={ getAvatarDataUri(user!.avatar) } alt="profile photo" className='h-24 w-24 sm:h-44 sm:w-44 rounded-full object-cover' />
    } else {
      if (selectedFile) {
        return <img src={preview} alt="profile photo" className='h-24 w-24 sm:h-44 sm:w-44 rounded-full object-cover' /> 
      }
      return <img src={AVATAR_DEFAULT} alt="profile photo" className='h-24 w-24 sm:h-44 sm:w-44 rounded-full object-cover' />
    }
  }

  return (
    <>
      <h1 className="text-lg sm:text-xl mb-6 sm:mb-10 text-grey-800 font-semibold">My Profile</h1>
      <div className='flex sm:flex-row flex-col gap-8'>
        <div className='flex flex-col gap-6 shrink-0'>
          { 
            displayAvatar()
          }
          <div className='flex flex-col gap-4'>
            {/* commented out because we can't use keydown on the label element / need to find a better way to style this */}
            {/* <label htmlFor='avatar' role="button" aria-label="Choose an image" 
                    className='sm:self-center underline text-grey-800'
                    tabIndex={0}>
              Click to select an image
              <input type="file" id='avatar' name='avatar'
                accept='.png, .jpeg, .jpg, .gif'
                onChange={ onSelectFile }
                className='hidden'/>
            </label> */}
            <input aria-label='choose avatar' type="file" id='avatar' name='avatar'
                accept='.png, .jpeg, .jpg, .gif'
                onChange={ onSelectFile } />
            {
              selectedFile ?
                <button aria-label='upload' className='bg-red-500 text-red-100 p-2 rounded-md font-medium text-xs sm:text-sm w-1/2' onClick={onUpload}>
                Upload
                </button>
                :
                <button aria-label='upload-disabled' className='bg-grey-500 text-grey-100 p-2 rounded-md font-medium text-xs sm:text-sm w-1/2 disabled'>
                Upload
                </button>
            }
            <ul className='text-red-600 text-xs'>
              <li>* Accept jpg, jpeg, gif, png file format</li>
              <li>* File size needs to be less than 300KB</li>
            </ul>
          </div>
        </div>
        {/* need to specify min-w-0 because the flex item will be at least the width of the narrowest child, 
          then break-words won't work */}
        <div className='text-grey-800 min-w-0'>
          <p className='text-lg sm:text-xl my-6'>{user!.username}</p>
          
          <div className='flex gap-4 items-center mb-4 text-sm sm:text-lg'>
            <p id='screen name'>{user!.screen_name}</p>
            <button aria-labelledby='screen name' className='relative hover:cursor-pointer'>
              <Icon path={mdiPencil} size={.7} className='text-grey-800 absolute top-1/4 left-1/4' />
              <Icon path={mdiCircle} size={1.4} className='text-red-200' />
            </button>
          </div>

          <p className='break-words'>{user!.email}</p>
        </div>
      </div>
     
    </>
  )
}