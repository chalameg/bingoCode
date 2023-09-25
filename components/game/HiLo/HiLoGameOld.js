import {useContext, useEffect} from 'react';
import {
  hiLoContainer,
  hiLoButton,
} from '../../../styles/home.module.scss';
import Button from '../../common/button/Button';
import DollarIcon from '@mui/icons-material/AttachMoney';
import CheckIcon from '@mui/icons-material/Check';

const HiLoGameOld = ({disabled, onDirectionChange, creditValue, direction, lowText, highText}) => {
  return (
    <div className={`flex-1 ${hiLoContainer}`}>
      <div className="flex justify-center align-end">
        <div className="flex flex-column align-center">
          <span>Lo</span>
          <Button
            disabled={disabled}
            className={hiLoButton}
            icon={direction === 'LOW' ? <CheckIcon/> : null}
            onClick={() => onDirectionChange('low')}
            buttonText={lowText}/>
        </div>
        <div className="flex align-center">
          <span>{creditValue}</span>
          <DollarIcon fontSize="small"/>
        </div>
        <div className="flex flex-column align-center">
          <span>Hi</span>
          <Button
            disabled={disabled}
            className={hiLoButton}
            icon={direction === 'HIGH' ? <CheckIcon/> : null}
            onClick={() => onDirectionChange('high')}
            buttonText={highText}/>
        </div>
      </div>
    </div>
  )
}
export default HiLoGameOld
