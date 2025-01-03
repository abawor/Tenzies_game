import React from "react"
import Confetti from "react-confetti"
import Die from "./Components/Die"
import {nanoid} from "nanoid"
import { Dice } from "../types"

export default function App() {
    const [dice, setDice] = React.useState<Dice[]>(allNewDice())
    const [currentScore, setCurrentScore] = React.useState<number>(1)
    const [tenzies, setTenzies] = React.useState<boolean>(false)
    let localRecord = localStorage.getItem("savedScoreRecord")
    let savedScoreRecord: number = 0

    if (localRecord) {
        savedScoreRecord = Number(localRecord)
    }

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        
        if (allHeld && allSameValue) {
            setTenzies(true)
            if ((savedScoreRecord > currentScore) || !savedScoreRecord) {
                localStorage.setItem("savedScoreRecord", currentScore.toString())
            }
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice: Dice[] = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function holdDice(id: Dice["id"]) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }

    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setCurrentScore(currentScore + 1)
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setCurrentScore(1)
            savedScoreRecord = Number(localStorage.getItem("savedScoreRecord"))
        }
    }

    function restartGame() {
        setTenzies(false)
        setDice(allNewDice())
        setCurrentScore(1)
    }
   
    let diceElements = dice.map(die =>
        <Die
            key={die.id}
            id={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    )
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze
                 it at its current value between rolls.
            </p>
            <p className="score">
                Record: {savedScoreRecord === 0 ? "" : savedScoreRecord}
                <br/>
                Current number of rolls: {currentScore}
            </p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
            <button className="restart-game" onClick={restartGame}>Restart</button>
        </main>
    )
}
