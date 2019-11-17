import React from 'react';
import { connect } from 'react-redux';
import { getJobsBy } from '../actions';
import jwt from 'jsonwebtoken';
import ClientJobList from './JobList/ClientJobList';
import axiosWithAuth from './axiosAuth';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FilterComponent from './FilterComponents/FilterComponent';
import { filterData, dataToFilter, setSearchKey, setSortKey } from '../actions/filterData';
import "../App.scss";

const HomePage = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

class ClientHomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: jwt.decode(localStorage.getItem("token")).userId,
        }
    }

    componentDidMount = async () => {
        const client = await axiosWithAuth().get(`https://voicer-lambda-app-staging.herokuapp.com/api/clients/${this.state.userId}`)
        console.log(client.data[0].clientId)
        this.props.getJobsBy(client.data[0].clientId)
        await this.props.dataToFilter(this.props.talent)
        await this.props.filterData()
    }

    render() {
        return(
            <HomePage>
                <FilterComponent />
                <ClientJobList jobs={this.props.jobs} />
                <Link to="/client/postJob" className="centered"><Button className="btn-orange btn-centered">Post Job</Button></Link>
            </HomePage>

        )
    }
}

const mapStateToProps = state => ({
    jobs: state.getJobsReducer.jobs,
    filteredData: state.filterReducer.filteredData
})

export default connect(
    mapStateToProps,
    { getJobsBy, dataToFilter, getTalent, filterData, setSortKey, setSearchKey }
)(ClientHomePage);