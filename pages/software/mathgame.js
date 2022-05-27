import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { mathgameStates } from '../../lib/states';
import PageTitle from '../../components/PageTitle'

export default function Mathgame() {
    const [mathgameData, setmathgameData] = useRecoilState(mathgameStates)
    const setMathgameData = (key, val) => {
      if(key && val) setmathgameData({ ...mathgameData, [key]: val })
    }
    const calcTimePressure = () => {
      setMathgameData('calculatedTimePressure', mathgameData.timePressure + mathgameData.difficulty * 2)
    }
    const [isMenu, setisMenu] = useState(true)
    const [rightAnswers, setrightAnswers] = useState(0)
    const [wrongAnswers, setwrongAnswers] = useState(0)
    const [showEarnedPoints, setshowEarnedPoints] = useState(false)
    const [score, setscore] = useState(0)
    const [multiplier, setmultiplier] = useState(1)
    const [highestStreak, sethighestStreak] = useState(1)
    const [info, setinfo] = useState('')
    const [exercise, setexercise] = useState('')
    const [result, setresult] = useState(0)
    const [answers, setanswers] = useState([0,0,0,0])
    const [points2earn, setpoints2earn] = useState(0)
    const [isEnd, setisEnd] = useState(false)
    const [answerBackground, setBackground] = useState('bg-black')

    const setMultiplier = newVal => {
      setmultiplier(newVal)
      sethighestStreak(newVal > highestStreak ? newVal : highestStreak)
      if(newVal < highestStreak && mathgameData.mode == 'strike') timeIsUp()
    }

    const inputLinesMenuData = [
      [
        'Exercise Difficulty', //title
        [['1', 1], ['2', 2], ['3', 3], ['4', 4]], //titleValArr
        'difficulty', //dataKey in mathgameData
        ['bg-orange-400', 'hover:border-orange-400', 'w-1/5'], //styles
        'the higher the harder', //info
        false //disabled
      ],
      [
        'Time Pressure',
        [['🐌', 13], ['🐎', 8], ['🐆', 6], ['⚡', 4]], // + 2 * Level @calcTimePressure()
        'timePressure',
        ['bg-pink-400', 'hover:border-pink-400 text-3xl', 'w-1/5'],
        'sets how fast the streakbar sinks'
      ],
      [
        'Mode',
        [['Time', 'time', 'game ends if time is up'], ['Strike', 'strike', 'game ends if streak gets interrupted']],
        'mode',
        ['bg-cyan-400', 'hover:border-cyan-400', 'w-2/5'],
        ``
      ],
      [
        'Playtime',
        [['00:30', 30], ['01:00', 60],['01:30', 90], ['02:00', 120],['03:00', 180], ['05:00', 300],['10:00', 600], ['15:00', 900]],
        'playtime',
        ['bg-green-400', 'hover:border-green-400', 'w-1/5'],
        'sets time limit in min',
        mathgameData.mode ==  'strike'
      ],
    ]

    const InputLine = ({ title, titleValArr, dataKey, styles, info, disabled }) => {
      return <div className={`w-full text-center mb-2 ${disabled && 'opacity-20'}`}>
        <div className='text-xl'>{title}:</div>
        <div onMouseEnter={() => { if(!disabled && !titleValArr[0][2]) setinfo(info) }} onMouseLeave={() => setinfo('')}
          className='w-full flex flex-wrap justify-evenly my-2'>
          {titleValArr.map((titleVal, index) => <div 
            key={index}
            onMouseEnter={() => { if(!disabled && titleVal[2]) setinfo(titleVal[2]) }}
            onClick={() => { if(!disabled) setMathgameData(dataKey, titleVal[1]) }}
            className={`mathgame-button m-1 border-2 text-sm ${styles[2]} ${mathgameData[dataKey] == titleVal[1] ? styles[0] + ' shadow-none ' : 'bg-white bg-opacity-10'} ${styles[1]} ${disabled && 'cursor-default'}`}>
            <div>{titleVal[0]}</div>
          </div>)}
        </div>
      </div>
    }

    const InputLinesMenu =  () => inputLinesMenuData.map((line, index) => (
      <div key={index}>
        <InputLine
          title={line[0]}
          titleValArr={line[1]}
          dataKey={line[2]}
          styles={line[3]}
          info={line[4]}
          disabled={line[5]}
        />
      </div>
    ))

    const Table = () => {
      const line = (key, val) => <div className='flex justify-between text-xl'>
        <div>{key}:</div>
        <div>{val}</div>
      </div>
      return <>
        <div className='p-4 text-xl'>
        <div className='text-2xl mb-4'>Result</div>
          {line('Mode', `${mathgameData.mode} ${mathgameData.mode == 'time' && `(${parseInt(Math.floor(mathgameData.playtime / 60)) < 10 && '0'}${parseInt(Math.floor(mathgameData.playtime / 60))}:${mathgameData.mode == 'time' && parseInt(mathgameData.playtime % 60) < 10 && '0'}${parseInt(mathgameData.playtime % 60)})`}`)}
          {line('Level', mathgameData.difficulty)}
          {line('Time Pressure', mathgameData.calculatedTimePressure + 's')}
          {line('Total Answers', rightAnswers + wrongAnswers)}
          {line('Right Answers', rightAnswers)}
          {line('Rate', `${Math.round(rightAnswers && rightAnswers / (wrongAnswers + rightAnswers) * 100 * 10) / 10}%`)}
          {line('Highest Streak', highestStreak)}
        </div>
      </>
    }

    const setNewExercise = () => {
      const isNeg = Math.random() < 0.5
      const isNeg2 = Math.random() < 0.5
      const isNeg3 = Math.random() < 0.5
      const getRand = (a, b) => Math.floor(Math.random() * a + b)

      const a10 = getRand(10, 1)
      const b20 = getRand(10, 11)
      const c50 = getRand(30, 21)
      const d100 = getRand(50, 51)
      const e500 = getRand(400, 101)

      const A10 = getRand(10, 1)
      const B20 = getRand(10, 11)
      const C50 = getRand(30, 21)
      const D100 = getRand(50, 51)
      const E500 = getRand(400, 101)

      let newResult
      let randomSyntax
      switch (mathgameData.difficulty) {
        case 1: randomSyntax = Math.floor(Math.random()*4)
          switch (randomSyntax) {
            case 0: setexercise(`${isNeg ? '- ' + a10 : a10} * ${A10} ${isNeg ? '- ' + b20 : '+ ' + b20}`)
              newResult = (isNeg ? a10 * -1 : a10) * A10 + (isNeg ? b20 * -1 : b20); break;
            case 1: setexercise(`${d100} - ${c50} + ${a10}`)
              newResult = d100 - c50 + a10; break;
            case 2: setexercise(`${isNeg ? '- ' + (a10 * A10) : (a10 * A10)} / ${A10} + ${b20}`)
              newResult = (isNeg ? (a10 * A10) * -1 : (a10 * A10)) / A10 + b20; break;
            case 3: setexercise(`${isNeg ? '- ' + c50 : c50} + ${C50} - ${a10}`)
              newResult = (isNeg ? c50 * -1 : c50) + C50 - a10; break;
            default: break;
          }
          break;
        case 2: randomSyntax = Math.floor(Math.random()*1)
          switch (randomSyntax) {
            case 0: setexercise(`${isNeg ? '- ' +  a10 : a10} * ${b20} ${isNeg2 ? '- ' + A10 : '+ ' + A10}`)
              newResult = (isNeg ? a10 * -1 : a10) * b20 + (isNeg2 ? A10 * -1 : A10); break;
            default: break;
          }
          break;
      
        default:
          break;
      }

      let answerArr = []
      answerArr.push(newResult)
      answerArr.push((newResult + getRand(5, 1)) * (Math.random() < 0.22 ? -1 : 1))
      answerArr.push(newResult + (getRand(5, 6) * (Math.random() < 0.5 ? -1 : 1)))
      answerArr.push(newResult + (getRand(6, 11) * (Math.random() < 0.5 ? -1 : 1)))

      //SHUFFLE
      let currIndex = answerArr.length,  randomIndex
      while (currIndex != 0) {
          randomIndex = Math.floor(Math.random() * currIndex)
          currIndex--
          // Swap it with the current element
          [answerArr[currIndex], answerArr[randomIndex]] = [
              answerArr[randomIndex], answerArr[currIndex]
          ]
      }
    
      setresult(newResult)
      setanswers(answerArr)
    }

    const checkAnswer = (index) => {
      if(answers[index] == result) {
        setBackground('bg-green-400')
        // setTimeout(() => setBackground('bg-transparent'), 1200)
        setrightAnswers(rightAnswers+1)
        setshowEarnedPoints(true)
        setTimeout(() => setshowEarnedPoints(false), 1000);
        setscore(score + points2earn * multiplier)
      } else {
        setBackground('bg-red-400')
        // setTimeout(() => setBackground('bg-transparent'), 1200)
        setwrongAnswers(wrongAnswers+1)
      }
      setNewExercise()
    }

    const menuSetup = () => {
      setBackground('bg-black')
    }
    
    const gameSetup = () => {
      setisEnd(false)
      setscore(0)
      setwrongAnswers(0)
      setrightAnswers(0)
      sethighestStreak(0)
      setNewExercise()
      calcPoints()
      calcTimePressure()
    }

    const calcPoints = () => {
      const lev = mathgameData.difficulty
      let tPres = mathgameData.timePressure
      let points = Math.round(100 + lev * lev * 7.5 - tPres * tPres * 0.4)
      let lastNum = () => parseInt(String(points)[String(points).length-1])
      while(lastNum() != 0 && lastNum() != 5){ points++ }
      setpoints2earn(points)
    }

    const timeIsUp = () => {
      setBackground('bg-black')
      setisEnd(true)
      setshowEarnedPoints(true)
      setTimeout(() => setshowEarnedPoints(false), 2000)
      setscore(score + Math.ceil(rightAnswers && rightAnswers / (wrongAnswers + rightAnswers) * 100 * 10)) // + rate * 10
    }

    useEffect(() => {
      if(!isMenu) gameSetup()
      else menuSetup()
    }, [isMenu])

    // useEffect(() => calcPoints(), [mathgameData])
  return <>
    <div className={`${answerBackground} absolute left-1/2 ml-[-187.5px] shadow-answers duration-300 bg-opacity-40 backdrop cursor-default font-mono text-white text-center rounded-3xl my-2 p-0 pt-5 mx-auto whitespace-pre-line 
      w-[375px] ${isMenu ? 'h-[562px]' : 'h-[495px]'} sm:mt-20 mt-2
      text-sm md:text-base`}>
        <h1 className='textShadow text-5xl text-center text-white font-cursive mb-3'>Mathgame</h1>
      {isMenu 
        ? <>
          <InputLinesMenu />
          <div className='h-6 flex items-center justify-center mb-0'><div>{info}</div></div>
        </>
        : isEnd 
        ? <Table />
        : <>
          {mathgameData.mode != 'strike' && <Clock estTime={mathgameData.playtime} timeIsUp_handler={timeIsUp} />}
          <div className='text-xl my-3'>{exercise}</div>
          <div>
            {answers.map((answer, index) => (
              <div key={index} onClick={() => checkAnswer(index)} className={`mathgame-button w-1/2 my-3 py-2 md:hover:bg-opacity-30`}>{answer}</div>
            ))}
          </div>
          <Streakbar 
            fill={rightAnswers} 
            empty={wrongAnswers} 
            timesUp={isEnd} 
            timePressure={mathgameData.calculatedTimePressure} 
            setMultiplier={setMultiplier}
            multiplier={multiplier}
          />
          <Ratebar rightAnswers={rightAnswers} wrongAnswers={wrongAnswers} />
        </>
      }
      {/* <div className='fixed top-0'>points2earn: {points2earn}</div> */}
      {!isMenu && <div className='flex justify-between items-center w-full bg-opacity-40 mb-1 px-3.5'>
        {!isEnd && <div className={`my-3 text-xl bottom-0 w-16 text-center`}>{multiplier > 1 ? multiplier + 'x' : '1x'}</div>}
        <div className='text-3xl font-extrabold mx-auto'>{showEarnedPoints && isEnd ? `Rate-Bonus: +${Math.round(rightAnswers && rightAnswers / (wrongAnswers + rightAnswers) * 100 * 10)}` : showEarnedPoints ? '+' + points2earn * multiplier : score}</div>
        {!isEnd && <div className={`my-3 text-xl bottom-0 w-16 text-center`}>{Math.round(rightAnswers && rightAnswers / (wrongAnswers + rightAnswers) * 100 * 10) / 10}%</div>}
      </div>}
      <div onClick={() => setisMenu(!isMenu)}
          className='w-32 relative bottom-0 mt-2 left-1/2 -ml-16 mathgame-button border-2 bg-indigo-800 bg-opacity-20 hover:bg-white duration-300 hover:text-indigo-800'>{isMenu ? 'Start' : 'Menu'}</div>
    </div>
  </>
}

const Clock = ({ estTime, timeIsUp_handler }) => {
  const [estimatingTime, setestimatingTime] = useState(estTime)
  const [clock, setclock] = useState('00 : 00')
  useEffect(() => setestimatingTime(estTime), [])
  useEffect(() => {
    let min = parseInt(Math.floor(estimatingTime / 60))
    let sec = parseInt(estimatingTime % 60)
    const timer = setInterval(() => {
      setclock(`${min < 10 ? '0' + min : min} : ${sec < 10 ? '0' + sec : sec}`)
      if(estimatingTime > 0) setestimatingTime(estimatingTime-1)
      else timeIsUp_handler()
    }, 1000)
    return () => clearInterval(timer)
  }, [estimatingTime])
  return <div className={`mx-auto w-28 pt-[2px] bg-white bg-opacity-10 rounded-full duration-300 ${estimatingTime < 10 && 'text-red-500 bg-opacity-50'}`}>{clock}</div>
}

const  Streakbar = ({ fill, empty, timesUp, timePressure, setMultiplier, multiplier }) => {
  const [height, setheight] = useState(100)
  const [isSecondRightAnswer, setisSecondRightAnswer] = useState(false)

  const full = () => { //if answer is right
    setMultiplier(height > 0 ? multiplier + 1 : 2)
    setheight(100)
  }

  const clear = () => {
    setMultiplier(1)
    setheight(0)
    setisSecondRightAnswer(false)
  }
  useEffect(() => {
    if(isSecondRightAnswer) full()
    else setisSecondRightAnswer(true)
  }, [fill])

  useEffect(() => clear(), [empty, timesUp])

  useEffect(() => {
    const sink = setInterval(() => {
      if(height > 0) setheight(height- 1.25 / timePressure)
      else setheight(0)
    }, 10)
    if(height == 0) clear()
    return () => clearInterval(sink)
  }, [height])

  return <>
    <div className={`absolute h-[216px] mt-[-224px] ml-3.5`}>
      <div className={`absolute h-[216px] w-16 rounded-xl overflow-hidden`}>
        <div style={{ height: `${height}%`}} className={`absolute rounded-sm w-16 bottom-0 bg-gradient-to-t from-cyan-600 via-cyan-300 to-white`}></div>
        <div className={`absolute z-10 h-[216px] w-16 rounded-xl shadow-inner-xl`}/>
      </div>
    </div>
  </>
}

const Ratebar = ({ rightAnswers, wrongAnswers }) => {
  return <>
    <div className={`absolute h-[216px] mt-[-224px] right-16 mr-3.5`}>
      <div className={`absolute h-[216px] w-16 rounded-xl overflow-hidden bg-red-400`}>
        <div style={{ height: `${Math.round(rightAnswers && rightAnswers / (wrongAnswers + rightAnswers) * 100 * 10) / 10}%`}} className={`absolute duration-500 ease-in-out rounded-sm w-16 bottom-0 bg-green-300`}/>
        <div className={`absolute z-10 h-[216px] w-16 rounded-xl shadow-inner-xl`}/>
      </div>
    </div>
  </>
}
