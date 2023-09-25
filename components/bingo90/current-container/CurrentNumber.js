import Current from "./Current";

const CurrentNumber = ({currentNumber, jackpotWinCount, jackpotCreditValue, numbersCount, doTurnStep, numbersDrawn}) => {
  return (
    <Current
      doTurnStep={doTurnStep}
      jackpotWinCount={jackpotWinCount}
      jackpotCreditValue={jackpotCreditValue}
      numbersCount={numbersCount}
      number={currentNumber}
      numbersDrawn={numbersDrawn}
      // angle={angle}
    />
  )
}
export default CurrentNumber
