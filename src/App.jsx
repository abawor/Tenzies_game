import React from "react"
import Die from "./Components/Die"

/**
 * Challenge:
 * 
 * - Create a Die component that takes a `value` prop
 * - Render 10 instances of the Die component (manually)
 *      - Provide a number between 1-6 for the value on each
 *        for now
 * - Style the <main> and <Die> components 
 *   to look like they do in the slide
 *      - Hints: Create a container to hold the 10 instances
 *        of the Die component, and use CSS Grid to lay them
 *        out evenly in 2 rows of 5 columns
 *      - Use flexbox on main to center the dice container
 *        in the center of the page
 */

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
export default function App() {
    return (
        <main>
            <container className="dice-container">
                <Die value={randomIntFromInterval(1, 6)} />
                <Die value={randomIntFromInterval(1, 6)} />
                <Die value={randomIntFromInterval(1, 6)} />
                <Die value={randomIntFromInterval(1, 6)} />
                <Die value={randomIntFromInterval(1, 6)} />
                <Die value={randomIntFromInterval(1, 6)} />
                <Die value={randomIntFromInterval(1, 6)} />
                <Die value={randomIntFromInterval(1, 6)} />
                <Die value={randomIntFromInterval(1, 6)} />
                <Die value={randomIntFromInterval(1, 6)} />
            </container>
        </main>
    )
}
