export type Dice = {
    value: number;
    isHeld: boolean;
    id: string;
}

export type DieProps = {
    id: Dice["id"];
    value: Dice["value"];
    isHeld: Dice["isHeld"];
    holdDice: () => void;

}
