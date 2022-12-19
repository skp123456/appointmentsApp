import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, updateStar} = props
  const {id, title, date, isFavorite} = appointmentDetails

  const filledStarImage =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
  const starImage =
    'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const starImageUrl = isFavorite ? filledStarImage : starImage

  const onClickStar = () => {
    updateStar(id)
  }

  return (
    <li className="card-container">
      <div>
        <p className="appointment-title">{title}</p>
        <p className="date">Date: {date}</p>
      </div>
      <button
        className="button-star"
        testid="star"
        type="button"
        onClick={onClickStar}
      >
        <img src={starImageUrl} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
