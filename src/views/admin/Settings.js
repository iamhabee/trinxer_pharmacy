import React, { useEffect } from "react";

// components
import SettingsCard from "components/Cards/SettingsCard.js";
import { connect } from "react-redux";
// import CardProfile from "components/Cards/CardProfile.js";

const mapStateToProps =({dispatch}) =>({dispatch})

function Settings({dispatch}) {
  useEffect(() => {
    dispatch({
      type:"user/CURRENT_USER"
    })
  }, [])
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <SettingsCard />
        </div>
      </div>
    </>
  );
}
export default connect(mapStateToProps)(Settings)
