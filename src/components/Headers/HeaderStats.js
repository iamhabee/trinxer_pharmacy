import React, { useEffect } from "react";

// components

import CardStats from "components/Cards/CardStats.js";
import { connect } from "react-redux";

const mapStateToProps = ({dispatch, user})=>({
  dispatch,
  stats:user.stats
})
function HeaderStats({stats, dispatch}) {
  useEffect(() => {
    dispatch({
      type:"user/GET_STATS"
    })
  }, [])
  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              {/* <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                <CardStats
                  statSubtitle="Visitors"
                  statTitle={stats.visitors}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-users"
                  statIconColor="bg-red-500"
                />
              </div> */}
              <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
                <CardStats
                  statSubtitle="Blog Posts"
                  statTitle={stats.post}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-6/12 px-4">
                <CardStats
                  statSubtitle="Admin/Staffs"
                  statTitle={stats.admin}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-user-shield"
                  statIconColor="bg-pink-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(HeaderStats)
