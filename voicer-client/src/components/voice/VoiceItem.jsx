import React, { useState, useEffect } from "react"
import Samples from "./Samples"
import EditProfile from "./EditProfile"

const VoiceItem = ({ data, token, bio, currentDisplayName }) => {
  const [edit, setEdit] = useState(false)
  const [crud, setCrud] = useState(false)

  //if logged in and your record => you can edit
  useEffect(() => {
    if (token && token.display_name === currentDisplayName) {
      setCrud(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //useEffect(()=> {console.log(`crud: ${crud} edit: ${edit}`)},[crud, edit])

  return (
    // if edit is true -->
    edit ? (
      // allow editing
      <article className="voiceItem">
        {crud && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault()
                setEdit(!edit)
              }}
            >
              cancel edit
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                setEdit(!edit)
              }}
            >
              submit edit
            </button>
            <EditProfile profileData={data} token={token} />
          </>
        )}
      </article>
    ) : (
      // don't allow editing
      <article className="voiceItem">
        {
          // check to see if we should allow editing
          crud && (
            <button
              onClick={(e) => {
                e.preventDefault()
                setEdit(!edit)
              }}
            >
              Edit My Info
            </button>
          )
        }
        <div className="profileHeader">
          <div className="profileImage">{/* photo placeholder */}</div>
          <div className="profileInfo">
            <h2>{`${data.first_name} ${data.last_name}`}</h2>
            <h3>{data.display_name}</h3>
            {bio && <p>{data.location}</p>}
            <div className="stars">
              <span role="img" aria-label="Stars">
                ⭐️⭐️⭐️⭐️⭐️
              </span>
            </div>
            <p>{data.jobsCompleted} Jobs Completed</p>
            {bio && <button>Invite to Apply</button>}
          </div>
          <div className="profileSamples">
            {data.samples && data.samples.map((sample) => <Samples />)}
          </div>
        </div>
        {bio && (
          <div className="profileBio">
            <p>{data.bio}</p>
          </div>
        )}
      </article>
    )
  )
}

export default VoiceItem
