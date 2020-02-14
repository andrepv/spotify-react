import { connect } from "react-redux";

const mapStateToProps = store => {
  return {
    progressBar: store.progressBar,
  };
};

export const connectProgressBar = connect(mapStateToProps);