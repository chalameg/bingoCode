import React, {useEffect, useState} from 'react';
import '../../../styles/handClick.css';

const HandClick = () => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setShow(prev => !prev);
    }, 3500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="wrapper-hand">
      {
        show && (
          <div className={'opshi'}>
            <div className="ring">
              <div className="coccoc-alo-phone coccoc-alo-green coccoc-alo-show">
                <div className="coccoc-alo-ph-circle"></div>
                <div className="coccoc-alo-ph-circle-fill"></div>

              </div>
            </div>
            <img src={"/static/images/tap.png"} width={'50'} className={"wrap-hend-img"}/>
          </div>
        )
      }
    </div>
  )
}

export default React.memo(HandClick)
