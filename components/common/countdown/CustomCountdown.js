import Countdown from "react-countdown";

const CustomCountdown = ({ seconds, onComplete }) => {
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      onComplete();
      return null;
    } else {
      // Render a countdown
      return <span>{hours}:{minutes}:{seconds}</span>;
    }
  };
  return <Countdown
    date={Date.now() + seconds}
    renderer={renderer}
  />;
};
export default CustomCountdown;
