

import React from 'react'
import ChangeProfile from './SettingComponent.jsx/ChangeProfile'
import ChangeProfilePicture from './SettingComponent.jsx/ChangeProfilePicture'
import ChangePassword from './SettingComponent.jsx/ChangePassword'
import DeleteAccount from './SettingComponent.jsx/DeleteAccount'

const Settings = () => {
  return (
    <div className=' flex flex-col gap-5'>
    <ChangeProfilePicture/>
     <ChangeProfile/>
      <ChangePassword/>
      <DeleteAccount/>
    </div>
  )
}

export default Settings
