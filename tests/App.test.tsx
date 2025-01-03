import { render, screen } from "@testing-library/react"
import App from "../src/App"

describe('App', () => {
    beforeEach(() => {
        render(<App />)
    })

    it('should render Tenzies heading', () => {
        const heading = screen.getByText("Tenzies")
        expect(heading).toBeInTheDocument()
    })
    
})