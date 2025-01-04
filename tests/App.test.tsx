import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "../src/App"

describe('App', () => {
    beforeEach(() => {
        render(<App />)
    })

    it('Render Tenzies heading', () => {
        const heading = screen.getByText("Tenzies")
        expect(heading).toBeInTheDocument()
    })

    it('Render Roll button', () => {
        const button = screen.getByRole("button", { name: /Roll/i })
        expect(button).toBeInTheDocument()
    })

    it('Call rollDice upon clicking Roll button', async () => {
        const currentScore = screen.getByText("Current number of rolls: 1")
        expect(currentScore).toBeInTheDocument()
        const button = screen.getByRole("button", { name: /Roll/i })
        await userEvent.click(button)
        const updatedCurrentScore = screen.getByText("Current number of rolls: 2")
        expect(updatedCurrentScore).toBeInTheDocument()
    })
    
})
