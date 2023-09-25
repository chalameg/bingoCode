import Prizes from "../board-container/Prizes";
import CenterNumber from "../board-container/CenterNumber";
import PlayersContainer from "../board-container/PlayersContainer";
import currentStyles from "../../../styles/current.module.css";

const GameMainView = ({ messageData }) => {
  const currentNumber = messageData?.game?.numbers_drawn
    ? messageData.game.numbers_drawn[messageData.game.numbers_drawn?.length - 1]
    : 0;
  const prizeValue = messageData?.nextPrizes?.length
    ? messageData.nextPrizes[0].credit_value
    : 0;
  return (
    <>
      <Prizes
        player_count={messageData.playersCount}
        ticket_count={messageData.ticketsCount}
        winState={messageData.winState}
        draw_delay={messageData.drawDelay}
        prizes={messageData.nextPrizes}
        doTurnStep={messageData.doTurnStep}
        jackpotWinCount={messageData.jackpotWinCount}
        jackpotCreditValue={messageData.jackpotCreditValue}
        numbers_count={messageData.numbersCount}
        number={messageData.number}
      />

      <CenterNumber
        doTurnStep={messageData.doTurnStep}
        jackpotWinCount={messageData.jackpotWinCount}
        jackpotCreditValue={messageData.jackpotCreditValue}
        numbersCount={messageData.numbersCount}
        numbersDrawn={messageData.numbersDrawn}
        current={currentNumber}
        prizeValue={prizeValue}
      />
      <PlayersContainer
        showWinners={messageData.showWinners}
        winners={messageData.winners}
        number={messageData.number}
        prizes={messageData.nextPrizes}
        numbersCount={messageData.numbersCount}
        ticketsCount={messageData.ticketsCount}
        playersCount={messageData.playersCount}
        creditValue={messageData.jackpotCreditValue}
        inGame={messageData.inGame}
        numbersDrawn={messageData.numbersDrawn}
        tickets={messageData.closestWinningTickets || []}
        current_number = {messageData.current_number}
        ticketsIds={messageData.ticketsIds}
        prizeValue={prizeValue / (messageData?.winners?.length || 1)}
        jackpotCreditValue={messageData.jackpotCreditValue}
        jackpotWinCount={messageData.jackpotWinCount}
        winDelay={messageData.winDelay}
        numbers_drawn={messageData?.game?.numbers_drawn}
        jackpotWinValue={messageData?.jackpotWinValue}

      />
      <div className={currentStyles.ballCount}>
        <div className={"flex-1 flex align-center justify-center"}>
          {messageData.numbersCount}
        </div>
        <div className={"line-break"} />
        <div className={"flex-1 flex align-center justify-center"}>75</div>
       
      </div>
    </>
  );
};

export default GameMainView;
