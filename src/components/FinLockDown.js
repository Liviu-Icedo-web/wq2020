import React from 'react';
import moment from 'moment';
import { withTranslation } from 'react-i18next';

class FinLockDown extends React.Component {
    state = {
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined
    };

    componentDidMount() {
       
            const { timeStop,timeStart } = this.props;
            const days = Math.floor(moment.duration(timeStop.diff(timeStart)).asDays());
            const countdown = moment(timeStart -timeStop);
            const hours = countdown.format('HH');
            const minutes = countdown.format('mm');
            const seconds = countdown.format('ss');
            this.setState({ days, hours, minutes, seconds });
        
    }



    render() {
        
        const { days, hours, minutes, seconds } = this.state;
        const {t} = this.props

        console.log('D - ',days,'H -',hours,'M -',minutes,'S -',seconds)
        if (!seconds) {
            return null;
        }

        return (
            <div>
                <h3> {this.props.userData.name}, {t('finLockDown')}</h3>
                <div className="countdown-wrapper">
                    {days && (
                        <div className="countdown-item fin-lock-down">
                            {days}
                            <span>{t('days')}</span>
                        </div>
                    )}
                    {hours && (
                        <div className="countdown-item fin-lock-down">
                            {hours}
                            <span>{t('hours')}</span>
                        </div>
                    )}
                    {minutes && (
                        <div className="countdown-item fin-lock-down">
                            {minutes}
                            <span>{t('min')}</span>
                        </div>
                    )}
                    {/* {seconds && (
                        <div className="countdown-item fin-lock-down">
                            {seconds}
                            <span>{t('sec')}</span>
                        </div>
                    )} */}
                </div>
            </div>
        );
    }
}

export default withTranslation()(FinLockDown);

