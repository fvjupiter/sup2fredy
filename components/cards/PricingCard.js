import React, { useEffect, useState } from 'react'
import { Icon } from '../../lib/icons'

export default function PricingCard({ data, index, cardId, setCardId, priceData, toggleData, setToggleData, setSectionsData }) {
    const [isCardInfo, setisCardInfo] = useState(false)
    useEffect(() => setisCardInfo(false), [cardId])
    return <>
        <div onClick={() => setCardId(index)}
            className={`${cardId == index ? `scale-105 bg-white ring-cyan-300 ${isCardInfo ? 'border-cyan-200' : 'border-white'} shadow-5xl text-black`
                : `scale-100 ring-gray-600 hover:border-white hover:ring-white hover:text-white text-gray-200 hover:opacity-100 opacity-80
                hover:bg-opacity-50 bg-black 
                hover:shadow-none shadow-4xl border-black cursor-pointer`}
                overflow-hidden
                border-4 ring-2 duration-300 rounded-3xl h-[550px] w-80 p-3 m-2 sm:mx-5 sm:mb-5`}
            >
                <div onClick={() => { if(cardId == index)setisCardInfo(!isCardInfo) }}
                    className={`${cardId == index ? `cursor-pointer
                        ${isCardInfo ? 'hover:text-red-600 text-red-800 active:shadow-answers-inner' : 'hover:bg-lime-200 bg-lime-300 text-black shadow-answers active:shadow-none'}`: 'bg-lime-300 text-black'}
                        duration-300 absolute rounded-full z-30 right-3.5 top-3.5 w-6 h-6 group flex justify-center items-center
                        overflow-hidden
                    `}>
                    {!isCardInfo ? <Icon id={'info'} classN='scale-[1.15]' size={24}/> : <Icon id={'close'} size={24}/>}
                </div>
                <div className={`${isCardInfo ? `h-[544px] px-4 py-2 ` : `h-0`}
                    top-0 left-0 w-full duration-300 ease-in-out absolute bg-white z-20 overflow-hidden rounded-2xl
                    `}>info
                </div>
                <div className={`${cardId != index && 'textShadow'} text-3xl font-cursive text-center`}>{data.title}</div>
                <div className={`mb-2`}><div className={`text-center`}>{data.types}</div></div>
                <UpperSection title={'Included'}>
                    {data.included.map((title, ind) => (
                        <div key={ind} className={`flex py-1 items-center justify-start`}>
                            {getCheckedBox(true, cardId == index)}
                            <div className='ml-2'>{title}</div>
                        </div>
                    ))}
                </UpperSection>
                <UpperSection title={'Add Features'}>
                    {data.extras.map((arr, ind) => (
                        <ExtraToggle key={ind} arr={arr} setToggleData={setToggleData} isCardChosen={cardId == index}/>
                    ))}
                </UpperSection>
                <div className={`text-xl font-bold text-center`}>{data.sections[0]}</div>
                <AddSections setSectionsData={setSectionsData} isCardChosen={cardId == index} sections={data.sections}/>
                <div className={`absolute bottom-3 text-3xl font-bold w-32 inset-x-1/2 -ml-16 px-4 py-2 rounded-3xl text-center text-black bg-lime-400`}>
                    {priceData[index]}€
                </div>
        </div>
    </>
}

const UpperSection = ({ title, children }) => <>
    <div className={`h-40`}>
        <div className={`text-xl font-bold text-center`}
            >{title}
        </div>
        {children}
    </div>
</>

const getCheckedBox = (isCheck, isCardChosen) => <>
    <div className={`h-6 w-6 ${isCheck ? 'opacity-100 bg-lime-300' : 'opacity-30 bg-gray-300'} 
      text-black rounded-full flex items-center justify-center duration-300`}
        >
            <Icon id={'check'} size={20}/>
    </div>
</>

const ExtraToggle = ({ arr, setToggleData, isCardChosen }) => {
    const [isActive, setisActive] = useState(false)
    const setData = () => {
        setToggleData(arr[0], isActive ? - 1 * arr[1] : arr[1])
        setisActive(!isActive)
    }
    return <>
        <div onClick={isCardChosen ? setData : null}
            className={`${isCardChosen && 'group'} flex py-1 items-center justify-start cursor-pointer`}
            >
            {getCheckedBox(isActive, isCardChosen)}
            <div className={`ml-2 flex justify-between w-64`}>
                <div>{arr[0]}</div>
                <div className={`
                    ${isActive ? 'bg-opacity-0' 
                    : 'group-hover:bg-lime-200 bg-lime-300 shadow-answers group-active:shadow-none'} 
                    duration-300 flex items-center justify-center rounded-full`}
                    >
                    <div className={`${isActive ? 'rotate-0' : '-rotate-45'} 
                        ${isActive ? 'group-hover:text-red-600 text-red-800' : 'text-black'} 
                        duration-300`}
                        >
                            <Icon id={'close'} size={24}/>
                    </div>
                </div>
            </div>
        </div>
    </>
}

const AddSections = ({ setSectionsData, isCardChosen, sections }) => {
    const [amount, setamount] = useState(sections[1])
    useEffect(() => setamount(sections[1]), [])
    const setData = isAdd => {
        if(isCardChosen){
            setSectionsData(
                isAdd ? amount + 1 : amount - 1, 
                isAdd ? sections[2] : - 1 * sections[2]
            )
            setamount(isAdd ? amount + 1 : amount - 1)
        }
    }
    return <div className={`flex w-32 py-1 mx-auto items-center justify-between`}>
        <div onClick={() => { if(amount > sections[1]) setData(false) }}
            className={`${amount > sections[1] ? `${isCardChosen && 'hover:bg-red-200 active:shadow-none'} bg-red-300 shadow-answers cursor-pointer` 
                : 'opacity-30 bg-gray-300'}
                duration-300 flex items-center justify-center rounded-full`}>
            <div className={`text-black duration-300`}>
                <Icon id={'dash'} size={24}/>
            </div>
        </div>
        <div className='text-xl font-bold'>{amount}</div>
        <div onClick={() => { if(amount < (sections[3] ? sections[3] : 99))  setData(true) }}
            className={`${amount < (sections[3] ? sections[3] : 99) ? `${isCardChosen && 'hover:bg-lime-200 active:shadow-none'} bg-lime-300 shadow-answers cursor-pointer`
                : 'opacity-30 bg-gray-300'}
                duration-300 flex items-center justify-center rounded-full`}>
            <div className={`-rotate-45 text-black duration-300`}>
                <Icon id={'close'} size={24}/>
            </div>
        </div>
    </div>
}