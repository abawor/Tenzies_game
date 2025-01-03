export type Dice = {
    id: string;
    value: number;
    isHeld: boolean;
}

export type DieProps = {
    id: Dice["id"];
    value: Dice["value"];
    isHeld: Dice["isHeld"];
    holdDice: () => void;

}
