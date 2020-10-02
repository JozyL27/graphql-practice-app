import React, { useState, useEffect } from 'react';
import { loadCompany } from './requests'

export const CompanyDetail = (props) =>  {
  const {companyId} = props.match.params
  const [ company, setCompany ] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
    const company = await loadCompany(companyId)
    setCompany(company)
    }

    fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if(!company) {
    return null
  }
    return (
      <div>
        <h1 className="title">{company.name}</h1>
        <div className="box">{company.description}</div>
      </div>
    );
}
