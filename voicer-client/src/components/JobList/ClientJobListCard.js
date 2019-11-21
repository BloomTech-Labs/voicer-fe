import React from 'react';
import { Link } from 'react-router-dom';
import { getApplications } from '../../actions';
import AppList from '../Applications/AppList';
import { connect } from 'react-redux';
import "../../App.scss";

// Styling
import {
  Divider,
  CardName,
  ClientCardTitle,
  ClientListButton,
  ClientListCardAction,
  ClientListCardActionItem,
  ClientListCardBody,
  ClientListCardDetail,
  ClientListCardDetailItem,
  ClientListCardDetails,
  ClientListCardHeader,
  ClientCardContainer
} from '../../styles/styledComponents/ClientListCard';

// Component
class ClientJobListCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeJob: {},
      modalIsOpen: false,
    }
  }
// Not working correctly because each ClientJobListCard is trying to use the same state variable in the getJobOffersReducer
  componentDidMount = () => {
    this.props.getApplications(this.props.jobData.jobId)
  }

  formatDate = (date) => {
    let newDate = new Date(date);
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let month = months[newDate.getMonth()]
    let day = newDate.getDate();
    let year = newDate.getFullYear();
    return(month.slice(0, 3) + ' ' + day + ', ' + year)
  }

  toggle = () => {
    this.setState({
        modalIsOpen: !this.state.modalIsOpen
    })
  }

  render() {
    return (
      <ClientCardContainer>
          <ClientListCardBody>
            <ClientListCardHeader>
              <ClientCardTitle>{this.props.jobData.jobTitle}</ClientCardTitle>
              <CardName>Applications: {this.props.apps.length}</CardName>
              <Divider/>
            </ClientListCardHeader>
            <ClientListCardDetails>
              <ClientListCardDetail>
                <ClientListCardDetailItem>
                  <strong>Status</strong>
                </ClientListCardDetailItem>
                <ClientListCardDetailItem>
                  {this.props.jobData.status}
                </ClientListCardDetailItem>
              </ClientListCardDetail>
              <ClientListCardDetail>
                <ClientListCardDetailItem>
                  <strong>JOB #</strong>
                </ClientListCardDetailItem>
                <ClientListCardDetailItem>
                  {this.props.jobData.jobId}
                </ClientListCardDetailItem>
              </ClientListCardDetail>
              <ClientListCardDetail>
                <ClientListCardDetailItem>
                  <strong>Posted On</strong>
                </ClientListCardDetailItem>
                <ClientListCardDetailItem>
                  {this.formatDate(this.props.jobData.createdDate)}
                </ClientListCardDetailItem>
              </ClientListCardDetail>
              <ClientListCardDetail>
                <ClientListCardDetailItem>
                  <strong>Price</strong>
                </ClientListCardDetailItem>
                <ClientListCardDetailItem>
                  {this.props.jobData.initialPrice}
                </ClientListCardDetailItem>
              </ClientListCardDetail>
            </ClientListCardDetails>
            <ClientListCardAction>
                <ClientListCardActionItem>
                  <Link to="/client/talentlist">
                    <ClientListButton className='btn-orange'>
                      Find Talent
                    </ClientListButton>
                  </Link>
                </ClientListCardActionItem>
                <ClientListCardActionItem>
                  <ClientListButton onClick = {() => {
                      this.toggle();
                    }
                  }>
                    Applications
                  </ClientListButton>
                </ClientListCardActionItem>
            </ClientListCardAction>
          </ClientListCardBody>
          <AppList
            toggle={this.toggle}
            isOpen={this.state.modalIsOpen}
            job={this.props.jobData}
            apps={this.props.apps}
          />
      </ClientCardContainer>
  );
  }
};

const mapStateToProps = state => ({
  apps: state.getJobOffersReducer.jobOffers
})

export default connect(
  mapStateToProps,
  { getApplications }
)(ClientJobListCard);