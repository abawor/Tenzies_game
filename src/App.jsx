import React from "react"
import Die from "../Components/Die"
import {nanoid} from "nanoid"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: (Math.ceil(Math.random() * 6)),
                isHeld: false,
                id: nanoid()
            })
        }
        return newDice
    }
    
    function holdDice(id) {
        setDice(dice.map(die => ({
            ...die,
            isHeld: die.id === id ? !die.isHeld : die.isHeld
        })
    ))}

    function rollDice() {
        setDice(allNewDice())
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
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>Roll</button>
        </main>
    )
}