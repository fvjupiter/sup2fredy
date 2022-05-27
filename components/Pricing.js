import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { screenState } from '../lib/states'
import PageTitle from './PageTitle'
import PricingCards from './PricingCards'

export default function Pricing({ data }) {
    const screen = useRecoilValue(screenState)
    const [cardId, setcardId] = useState(0)
    const setCardId = id => setcardId(id)
    const [priceData, setpriceData] = useState({})
    const setPriceData = val => {
        console.log('priceData', priceData)
        setpriceData({
            ...priceData,
            [cardId]: priceData[cardId] + val
        })
    }
    const [toggleData, settoggleData] = useState({})
    const setToggleData = (key, val) => {
        console.log('toggleData:', toggleData)
        setPriceData(val)
        if(val < 0){
            let toggleDataCopy = Object.assign({},{ ...toggleData })
            delete toggleDataCopy[cardId][key]
        } else settoggleData({
            ...toggleData,
            [cardId]: {
                ...toggleData[cardId],
                [key]: val > 0 ? val : 0
            }
        })
    }
    const [sectionsData, setsectionsData] = useState({})
    const setSectionsData = (amount, val) => {
        console.log('sectionsData', sectionsData)
        setPriceData(val)
        setsectionsData({
            ...sectionsData,
            [cardId]: [amount, amount * val]
        })
    }

    useEffect(() => {
        let newPriceData = {}
        let newToggleData = {}
        let newSectionsData = {}
        for (let i = 0; i < data.length; i++) {
            newPriceData[i] = data[i].price
            newToggleData[i] = {}
            newSectionsData[i] = [data[i].sections[1], data[i].sections[1] * data[i].sections[2]] // amount, amount * price / section
        }
        setpriceData(newPriceData)
        settoggleData(newToggleData)
        setsectionsData(newSectionsData)
    }, [])

    const getEmailBody = () => {
        let body = `Option: ${data[cardId].title}; Price-prediction: ${priceData[cardId] && priceData[cardId]}€; Features: ${toggleData[cardId] && Object.entries(toggleData[cardId]).length != 0 && Object.keys(toggleData[cardId])}; Pages: ${sectionsData[cardId] && sectionsData[cardId][0]};`
        return body
    }
    return <>
        <div style={{ top: screen.height }} className='pb-14 max-h-min w-[1100px] max-w-full bigShadow rounded-3xl mx-auto'>
            <PageTitle title={'Pricing'} />
            {/* <div className={`flex items-center justify-center w-10/12 text-white rounded-3xl bg-black bg-opacity-50 backdrop mx-auto mt-2 p-4`}>
                <ul style={{ listStyleType: 'circle' }} className='mx-4'>
                    MAKE EMAIL FORM... PROVIDE INFO ABOUT 'WEB-APPS'
                    <li>Choose an option below, add or remove features &amp; pages and hit 'Send Request' to send me an e-mail and receive a personal offer
                        (Please provide additional information about what kind of Web-App you're looking for and for which purposes as well as your <span className='font-bold'>design wishes</span>)
                    </li>
                    <li>The calculated price is just a prediction and can vary depending on individual requirements</li>
                    <li>'Install-Function' means that the visitors of your Web-App will be able to download and install it on their smartphone or computer to use it offline</li>
                    <li>If you have any questions just send me an e-mail to <a href={`mailto:schoof.frederik@gmail.com?subject=Web-App`}>schoof.frederik@gmail.com</a></li>
                </ul>
            </div> */}
            <div className='text-center mt-4 mb-2 textShadow text-3xl text-white font-cursive'>1. Choose an option</div>
            <PricingCards data={data} cardId={cardId} setCardId={setCardId} priceData={priceData} toggle_data={toggleData} setToggleData={setToggleData} setSectionsData={setSectionsData}/>
            <div className='text-center mt-4 mb-2 textShadow text-3xl text-white font-cursive'>2. Fill out form</div>
            <a href={`mailto:schoof.frederik@gmail.com?subject=Web-App Request&body=${getEmailBody()}`}>
                <div className={`text-lg bg-lime-400 hover:bg-lime-300 
                    shadow-3xl hover:shadow-none rounded-3xl duration-300
                    px-4 py-2 mx-auto 
                    text-black font-bold 
                    w-56 h-12 flex items-center justify-center`}>
                    <div>Send Request</div>
                </div>
            </a>


            {/* <form action="mailto:schoof.frederik@gmail.com" method="GET" target="_blank" className='text-gray-500'>
                <div className='text-xl'>Send a request to schoof.frederik@gmail.com</div>
                <div>
                    <label class="label" for="subject">Email Subject</label>
                    <input name="subject" id="subject" type="text" class="input" value="Exa"/>
                </div>
                <div>
                    <label class="label" for="body">Email Body</label>
                    <textarea class="textarea" name="body" id="body">Example Email Body</textarea>
                </div>
                <div>
                    <input type="submit" value="Create Email" className='bg-lime-400'/>
                </div>
            </form> */}
        </div>
    </>
}
