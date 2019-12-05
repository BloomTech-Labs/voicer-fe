import React, { Component } from 'react';
import ClientJobListCard from './ClientJobListCard';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { getApplicationsByClientId, getClientProfile } from '../../actions';
import AppList from '../Applications/AppList';
import jwt from 'jsonwebtoken';
import '../../App.scss';

// Styling
const MainDiv = styled.div`
  width: 60%;
  margin: 0 auto;
  padding: 10px;
`

// Component
class ClientJobList extends Component {
    constructor(props) {
        super(props)
        this.state = {
          activeJob: {},
          modalIsOpen: false,
        }
    }



    toggle = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        })
    }

    setActiveJob = job => {
        this.setState({
            activeJob: job,
        })
    }

    render() {
        const openJobs = this.props.jobs.filter(job => job.status !== "Hired")
        const hiredJobs = this.props.jobs.filter(job => job.status !== "Hiring")
        return (
            <MainDiv>
                <h1>Hiring Jobs</h1>
                {openJobs.map(job =>
                    <ClientJobListCard
                        key={job.jobId}
                        jobData={job}
                        setActiveJob={this.setActiveJob}
                        toggle={this.toggle}
                        applications={this.props.applications.filter(app => app.jobId === job.jobId)}
                    />)}
                <h1>Hired Jobs</h1>
                {hiredJobs.map(job =>
                    <ClientJobListCard
                        key={job.jobId}
                        jobData={job}
                        setActiveJob={this.setActiveJob}
                        toggle={this.toggle}
                        applications={this.props.applications.filter(app => app.jobId === job.jobId)}
                    />)}
                <AppList
                    toggle={this.toggle}
                    isOpen={this.state.modalIsOpen}
                    clientName={this.props.clientName}
                    activeJob={this.state.activeJob}
                    apps={this.props.applications.filter(app => app.jobId === this.state.activeJob.jobId)}
                />
            </MainDiv>
        );
    }
};

  export default ClientJobList;
