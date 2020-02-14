import { connect } from "react-redux";

const mapStateToProps = store => {
  return {
    player: store.player,
  };
};

export const connectPlayer = connect(mapStateToProps);