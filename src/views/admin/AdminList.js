import React, {useEffect} from "react";

// components

import AdminTable from "components/Cards/AdminTable.js";
import { connect } from "react-redux";

const mapStateToProps =({dispatch})=>({
  dispatch
})

function AdminList({dispatch}) {
  useEffect(() => {
    dispatch({
      type:"admin/ALL_ADMIN"
    })
    dispatch({
      type:"user/CURRENT_USER"
    })
  }, [])
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <AdminTable color="light" />
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(AdminList)
