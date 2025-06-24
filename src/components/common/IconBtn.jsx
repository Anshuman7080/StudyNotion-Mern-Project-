import React from 'react'

const IconBtn = ({text,
    onclick,
    children,
    disabled,
    active,
    outline=false,
    customClasses,
    type,
}) => {
  return (
   <button
   disabled={disabled}
   onClick={onclick}
   type={type}
   className={`px-8 py-2 text-center rounded-lg text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
            ${active ? 'bg-richblack-700' : 'bg-yellow-50'} ${customClasses}`}
   >
    {
        children ? (
            <>
                <span>
                    {text}
                </span>
                {children}
            </>
        ) : (text)
    }
   </button>
  )
}

export default IconBtn
