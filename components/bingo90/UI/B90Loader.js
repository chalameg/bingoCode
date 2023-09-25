import { FaSpinner } from 'react-icons/fa';
import style from '../../../styles/bingo90/index.module.scss';

const B90Loader = () => {
  return <div className={`h-100 w-100 flex align-center justify-center`} >
    <div className={`flex gap-20 ${style.loaderContainer}`}>
      <FaSpinner className="spin-animation" style={{ color: 'rgba(255, 180, 35, 1)' }} />
      <div className="mt-10">2PLAY1</div>
    </div>
  </div>;
};
export default B90Loader;
