import React, { Component } from 'react';
import JobListCard from './JobListCard';
import styled from 'styled-components';

// Styling
const MainDiv = styled.div`
  width: 60%;
  margin: 10px;
  margin-left: auto;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  border: 1px solid red;
  padding: 10px;
`

// Component
class JobList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobData: this.props.jobs
        }
    }

    render() {
        return (
            <MainDiv>
                {this.state.jobData.map(job => <JobListCard jobData={job}/>)}
            </MainDiv>
        );
    };
};

export default JobList