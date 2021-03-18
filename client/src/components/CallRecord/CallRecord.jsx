import React, { useEffect } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCallRecord, selectToken } from "../../states/user/user.selector";
import FileCopyIcon from "@material-ui/icons/FileCopy";

import styles from "./CallRecord.module.css";
import { loadCallRecordStart } from "../../states/user/user.action";

const CallRecord = ({ callRecord, token, loadCallRecordStart }) => {
  useEffect(() => {
    callRecord === null && loadCallRecordStart(token);
  }, []);
  return (
    <div className={styles.phoneBookContainer}>
      <div className={styles.banner}>
        <FileCopyIcon
          style={{ color: "#009688", fontSize: "2.5rem", marginRight: ".5rem" }}
        />
        <div>
          <span style={{ fontSize: "1.5rem", fontWeight: "400" }}>
            Call Records
          </span>
          <br></br>
          <span>List of all Calls</span>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.tableDiv}>
          <table className={styles.tableStyle}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Auto Dialer</th>
                <th>Call Duration</th>
                <th>Time_stamp</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {callRecord !== null &&
                callRecord.map((record) => (
                  <tr key={record.id}>
                    <td>{record.contact_name}</td>
                    <td>{record.contact_number}</td>
                    <td>{record.dialer_name}</td>
                    <td>{record.call_duration}</td>
                    <td>{record.time_stamp}</td>
                    <td>{record.price}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  callRecord: selectCallRecord,
});

const mapDispatchToProps = (dispatch) => ({
  loadCallRecordStart: (token) => dispatch(loadCallRecordStart(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CallRecord);
