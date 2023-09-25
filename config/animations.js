import Radium from "radium";
import { fadeInDown, fadeOut, flipInX, flipOutX, merge } from "react-animations";

const animations = {
  in: {
    animation: "in 500ms",
    animationName: Radium.keyframes(merge(flipInX, fadeInDown), "in")
  },
  out: {
    animation: "in 1s",
    animationName: Radium.keyframes(merge(fadeOut, flipOutX), "out")
  }
};
export default animations;
