// import React from 'react'

import { useParams } from "react-router"

type Props = {}

const SingleCountry = (props: Props) => {
const params = useParams()
console.log(params);


  return (
    <div>
        <h1>More info about this country: {params.countryName} </h1>
    </div>
  )
}

export default SingleCountry