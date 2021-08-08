import React, { useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';

export default function Alerts() {
  const { alerts } = useContext(AlertContext);
  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div className={`alert alert-${alert.type}`} key={alert.id}>
        <i className='fas fa-info-circle'></i> {alert.msg}
      </div>
    ))
  );
}
