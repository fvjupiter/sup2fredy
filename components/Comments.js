import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { getComments, writeComment } from '../firebase/action'
import { commentListState } from '../lib/states'
import CommentCard from './cards/CommentCard'

export default function Comments({ border, ring, bg_success, bg_success_hover }) {
    const router = useRouter()
    const asPath = router.asPath
    const param2 = asPath.split('/')[2]
    const param3 = asPath.split('/')[3]

    const [name, setname] = useState('')
    const [newComment, setnewComment] = useState('')
    const [isValid, setisValid] = useState(false)
    const [successfullySend, setsuccessfullySend] = useState(false)

    useEffect(() => setsuccessfullySend(false), [param3])
    useEffect(() => {
        setisValid(
            (name.length > 2) 
            && /[a-zA-Z]/.test(newComment) 
            && newComment.length > 2 
            ? true : false
        )
    }, [name, newComment])

    const comment = () => {
        if(isValid) {
            writeComment({
                name: name,
                comment: newComment,
                folder: param2,
                folder2: param3
            })
            setname('')
            setnewComment('')
            setsuccessfullySend(true)

            getComments({
                folder: param2,
                folder2: param3,
                callback: updateCommentList
            })
        }
    }



    const [commentList, setcommentList] = useRecoilState(commentListState)
    const [comments, setcomments] = useState([])

    useEffect(() => {
        let commentsArr = []
        for (const i in commentList[param2][param3]) {
            if (Object.hasOwnProperty.call(commentList[param2][param3], i)) {
                commentsArr.push(commentList[param2][param3][i])
            }
        }
        setcomments(commentsArr)
        console.log('C.js 62 useeffect [param3, commentList] setcomments(): commentsArr', commentsArr)
    }, [param3, commentList])

    const updateCommentList = (folder, folder2, doc_id, newData) => {
        setcommentList(prev => ({
            ...prev, 
            [folder]: {
                ...prev[folder], 
                [folder2]: {
                    ...prev[folder][folder2], 
                    [doc_id]: newData
                }
            }
        }))
        console.log('C.js 76 updateCommentList() (callback firestore)')
    }

    useEffect(() => {
        setname('')
        setnewComment('')
        if(!commentList.poems.hasOwnProperty(param3)){
            console.log('C.js 81 UseEffect [param3], getComments() if not already done. param3:', param3)
            getComments({
                folder: param2,
                folder2: param3,
                callback: updateCommentList
            })
        }
    },[param3])

  return <div className='px-1.5 mb-20'>
    <div className='textShadow text-2xl md:text-4xl m-4 font-cursive text-white text-center'>Comments</div>
    <div className={`mb-4 mx-auto min-w-[318px] sm:w-[590px] md:min-w-[620px] md:max-w-[800px] max-w-[590px] bg-black bg-opacity-70 p-4 rounded-xl border sm:border-2 ${border} ring-4`}>
        {!successfullySend ?
            <>
            <div className={`mx-auto mb-4`}>
                <div className='text-white text-center mb-2'>Name</div>
                <div className={`center`}>
                    <input 
                        placeholder='name' 
                        type='text'
                        value={name} 
                        onChange={(e) => setname(e.target.value)} 
                        className={`p-2 rounded-md ${ring} focus:ring-4 outline-none w-full`}
                    />
                </div>
            </div>
            <div className='text-white text-center mb-2'>Your Comment</div>
            <textarea 
                placeholder='comment' 
                value={newComment} 
                onChange={(e) => setnewComment(e.target.value)} 
                className={`p-2 rounded-md ${ring} focus:ring-4 outline-none w-full mb-4 h-40`}
            />
            <div onClick={comment} 
                className={`py-2 px-4 w-full text-center rounded-md ${isValid ? `${bg_success} ${bg_success_hover} cursor-pointer` : 'bg-stone-500 cursor-not-allowed'} mx-auto duration-300`}
            >
                send
            </div>
            </>
        :
            <div className={`${bg_success} text-center py-4 rounded-md`}>✅ Successfully Sent!</div>
        }
    </div>

    <div className=''>
        {comments.map((el, index) => (
            <CommentCard key={index}
                name={el.name}
                content={el.comment}
                classN={`${border}`}
            />
        ))}
    </div>
  </div>
}
