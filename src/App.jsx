import React from "react"
import Confetti from "react-confetti"
import Die from "../Components/Die"
import {nanoid} from "nanoid"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [currentScore, setCurrentScore] = React.useState(0)
    const [tenzies, setTenzies] = React.useState(false)
    let savedScoreRecord = localStorage.getItem("savedScoreRecord")

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        
        if (allHeld && allSameValue) {
            setTenzies(true)
            if ((savedScoreRecord > currentScore) || !savedScoreRecord) {
                localStorage.setItem("savedScoreRecord", currentScore)
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
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function holdDice(id) {
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
            setCurrentScore(0)
            savedScoreRecord = localStorage.getItem("savedScoreRecord")
        }
    }

    function restartGame() {
        setTenzies(false)
        setDice(allNewDice())
        setCurrentScore(0)
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
                Record: {savedScoreRecord}
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
