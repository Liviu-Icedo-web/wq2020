import React from 'react'
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

  class DateTimeStop extends React.Component {
    state = {
        startDate: new Date()
      };
   
      componentDidMount() {
            const datePickers = document.getElementsByClassName("react-datepicker__input-container");
            Array.from(datePickers).forEach((el => el.childNodes[0].setAttribute("readOnly", true)))
      }
      

      handleChange = date => {
        console.log('TIMESTOP',date)
        this.setState({
          startDate: date,
        });
        this.props.onAddEndLock(date)
      };
   
    render() {
      return (
        <DatePicker
        selected={this.state.startDate}
        showTimeSelect
        onChange={this.handleChange}
        dateFormat="MMMM d, yyyy h:mm aa"
        className="wq-time-pick"
        
      />
      );
    }
  }  

  export default DateTimeStop;