import React from 'react'

export default function CommentCard({ name, content, classN }) {
  return <>
    <div className={`${classN} border-2 mb-4 w-11/12 sm:w-[620px] bg-black bg-opacity-70 mx-auto rounded-lg text-white p-4`}>
        <div className='text-xl font-medium underline underline-offset-8 mb-2'>{name}</div>
        <div className='whitespace-pre-line'>{content}</div>
    </div>
  </>
}
