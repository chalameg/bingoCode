import {crowdContainer} from "../../../../styles/index.module.scss";
// import Image from 'next/image'

// const loader = crowdBackground => crowdBackground;
const CrowdContainer = ({crowd}) => {
  return (
    <div
      className={crowdContainer}
      // style={{ backgroundImage: `url("${crowdBackground}")` }}
    >
      <img height={'100%'} width={'100%'} src={crowd}  alt={"Crowd"}/>
    </div>
  );
};
export default CrowdContainer;
