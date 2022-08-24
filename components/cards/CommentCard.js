import React from 'react'

export default function CommentCard({ name, content, classN }) {
  return <>
    <div className={`${classN} border sm:border-2 ring-4 mb-4 min-w-[318px] sm:w-[590px] md:min-w-[620px] md:max-w-[800px] max-w-[590px] bg-black bg-opacity-70 mx-auto rounded-lg text-white p-4`}>
        <div 
          style={{ 
            textDecoration: 'underline',
            textUnderlineOffset: 8
         }} 
          className='text-xl font-medium mb-2'
          >
            {name}
          </div>
        <div className='whitespace-pre-line'>{content}</div>
    </div>
  </>
}
