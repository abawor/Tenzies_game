import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "../src/App"
import { a } from "vitest/dist/chunks/suite.B2jumIFP"

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

    it('Increment current number of rolls by 1 after 1 click on Roll button', async () => {
        const currentScore = screen.getByText("Current number of rolls: 1")
        expect(currentScore).toBeInTheDocument()
        const button = screen.getByRole("button", { name: /Roll/i })
        await userEvent.click(button)
        const updatedCurrentScore = screen.getByText("Current number of rolls: 2")
        expect(updatedCurrentScore).toBeInTheDocument()
    })

    it('Render 10 dice elements', () => {
        const diceElements = screen.getAllByTestId("die")
        expect(diceElements.length).toBe(10)
    })

    it('Update Record to 5 after 4 rolls if tenzies is true', async () => {
        vi.spyOn(global.Math, "random").mockReturnValue(0.1)
        const button = screen.getByRole("button", { name: /Roll/i })
        for (let i = 0; i < 4; i++) {
            await userEvent.click(button)
        }
        const diceElements = screen.getAllByTestId("die")
        for (const die of diceElements) {
            await userEvent.click(die)
        }
        vi.spyOn(global.Math, "random").mockRestore()
        
        const recordScore = screen.getByText("Record: 5")
        expect(recordScore).toBeInTheDocument()
    })
    
})
