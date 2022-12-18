import React, { useContext} from 'react'
import movieContext from './context/Moviecontext'
const Alert = () => {
    const {display,alertmsg,alerttype}=useContext(movieContext)
  return (
    <div className="container fixed-bottom">
      <div className={`alert alert-${alerttype}`} role="alert" style={{display:display}}>
      <strong>{(alerttype==="warning")?"Error":"Success"}! </strong>{alertmsg}
</div>
    </div>
  )
}

export default Alert