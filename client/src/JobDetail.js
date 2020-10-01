import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadJob } from './requests'

export class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {job: null, loading: false};
  }

  async componentDidMount() {
    this.setState({ loading: true })
    const {jobId} = this.props.match.params;
    const job = await loadJob(jobId)
    this.setState({ job: job, loading: false })
  }

  render() {
    const {job, loading} = this.state;
    if(!job && loading === false) {
      return <p>No Job was found</p>
    } else if(loading === true && !job) {
      return <p>loading....</p>
    } else {
    return (
      <div>
        <h1 className="title">{job.title}</h1>
        <h2 className="subtitle">
          <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
        </h2>
        <div className="box">{job.description}</div>
      </div>
    );
    }
  }
}
