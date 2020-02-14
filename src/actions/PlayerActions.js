import { PLAYER } from "constants/ActionConstants";
import makeActionCreator from "utils/makeActionCreator";

export const playTrack = makeActionCreator(PLAYER.PLAY, "payload");
export const pauseTrack = makeActionCreator(PLAYER.PAUSE);
export const resumeTrack = makeActionCreator(PLAYER.RESUME);
export const setContext = makeActionCreator(PLAYER.SET_CONTEXT, "payload");
export const toggleReapeat = makeActionCreator(PLAYER.TOGGLE_REPEAT);
export const updateContext = makeActionCreator(
  PLAYER.UPDATE_CONTEXT,
  "payload"
);
export const changeCurrentTime = makeActionCreator(
  PLAYER.CHANGE_CURRENT_TIME,
  "payload"
);