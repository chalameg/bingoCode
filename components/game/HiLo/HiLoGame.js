import {HomeContext, HiLoContext} from "../../../common/context";
import {useContext, useEffect} from 'react';
import {
  hiLoContainer,
  hiLoButton,
} from '../../../styles/home.module.scss';
import Button from '../../common/button/Button';
import DollarIcon from '@mui/icons-material/AttachMoney';
import CheckIcon from '@mui/icons-material/Check';

const HiLoGame = () => {
  const {messageData} = useContext(HomeContext);
  const {game} = messageData;
  const {selected, bet, select, setIsPlaying} = useContext(HiLoContext);
  useEffect(() => {
    select("none");
    if ((game?.high_winnings === null && game?.low_winnings === null)) {
      setIsPlaying(false);
    }
    // if (bet === null) {
    //   setIsPlaying(false);
    // }
    console.log('bet', bet)
  }, [game?.high_winnings, game?.low_winnings, bet]);
  return (
    <div className={`flex-1 ${hiLoContainer}`}>
      <div className="flex justify-center align-end">
        <div className="flex flex-column align-center">
          <span>Lo</span>
          <Button
            disabled={selected !== 'none'}
            className={hiLoButton}
            icon={selected === 'low' ? <CheckIcon/> : null}
            onClick={() => select('low')}
            buttonText={`${game?.low_winnings || 'LOW'}`}/>
        </div>
        <div className="flex align-center">
          <span>{bet?.credit_value || 'Bet'}</span>
          <DollarIcon fontSize="small"/>
        </div>
        <div className="flex flex-column align-center">
          <span>Hi</span>
          <Button
            disabled={selected !== 'none'}
            className={hiLoButton}
            icon={selected === 'high' ? <CheckIcon/> : null}
            onClick={() => select('high')}
            buttonText={`${game?.high_winnings || 'HIGH'}`}/>
        </div>
      </div>
    </div>
  )
}
export default HiLoGame
