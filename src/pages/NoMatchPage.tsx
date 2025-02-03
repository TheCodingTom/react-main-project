// import React from 'react'

import { Button } from "@mui/material";
// import { useEffect } from "react";
import { useNavigate } from "react-router";

function NoMatchPage() {
  const goBackTo = useNavigate();

  const redirectTo = () => { // with the other method you don't need this 2nd function
    goBackTo("/")
  }

  // const autoRedirect = () => {
  //   setTimeout(() => {
  //       redirectTo()
  //   }, 3000);
  // }

  // useEffect(() => {
  //   autoRedirect()
  // }, [])
  

  return (
    <div>
      <h1>Sorry, nothing to display here</h1>
      {/* <h2>You'll be redirected to the home page in 3 seconds </h2> */}
     <Button onClick={redirectTo}>Go back to home page</Button>

      {/* <Button
        onClick={() => {
          goBackTo("/");
        }}
      >
        Go back home
      </Button> */}
    </div>
  );
}

export default NoMatchPage;
