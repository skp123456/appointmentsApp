import {Component} from 'react'

import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

const initialAppointmentsList = []

class Appointments extends Component {
  state = {
    appointmentsDetailsList: initialAppointmentsList,
    userTitle: '',
    userDate: '',
    isStarFilterActive: false,
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {userTitle, userDate} = this.state

    const formattedDate = userDate
      ? format(new Date(userDate), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: userTitle,
      date: formattedDate,
      isFavorite: false,
    }

    this.setState(prevState => ({
      appointmentsDetailsList: [
        ...prevState.appointmentsDetailsList,
        newAppointment,
      ],
      userTitle: '',
      userDate: '',
    }))
  }

  updateStar = id => {
    this.setState(prevState => ({
      appointmentsDetailsList: prevState.appointmentsDetailsList.map(
        eachItem => {
          if (eachItem.id === id) {
            return {...eachItem, isFavorite: !eachItem.isFavorite}
          }
          return eachItem
        },
      ),
    }))
  }

  onClickStar = () => {
    this.setState(prevState => ({
      isStarFilterActive: !prevState.isStarFilterActive,
    }))
  }

  getFilteredList = () => {
    const {appointmentsDetailsList, isStarFilterActive} = this.state

    if (isStarFilterActive) {
      return appointmentsDetailsList.filter(
        eachItem => eachItem.isFavorite === true,
      )
    }
    return appointmentsDetailsList
  }

  onChangeTitle = event => {
    this.setState({
      userTitle: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      userDate: event.target.value,
    })
  }

  render() {
    const {userTitle, userDate} = this.state

    const filteredList = this.getFilteredList()
    return (
      <div className="bg-container">
        <div className="appointments-card-container">
          <div className="content-container">
            <div>
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="main-heading">Add Appointment</h1>
                <label className="input-title" htmlFor="title">
                  TITLE
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  className="input-element"
                  value={userTitle}
                  id="title"
                  onChange={this.onChangeTitle}
                />
                <label className="date" htmlFor="date">
                  DATE
                </label>
                <input
                  type="date"
                  className="input-element"
                  value={userDate}
                  id="date"
                  onChange={this.onChangeDate}
                />
                <button className="button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="image"
              alt="appointments"
            />
          </div>
          <hr className="seperator" />
          <div className="sub-container">
            <h1 className="title">Appointments</h1>
            <button
              className="starred-button"
              type="button"
              onClick={this.onClickStar}
            >
              Starred
            </button>
          </div>
          <ul className="list-item-container">
            {filteredList.map(eachItem => (
              <AppointmentItem
                appointmentDetails={eachItem}
                key={eachItem.id}
                updateStar={this.updateStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
