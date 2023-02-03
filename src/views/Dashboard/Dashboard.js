import React from 'react';

import Table from "./Components/Table"
import styled from 'styled-components';


const Container=styled.div`
background-image:url("./background.jpg");
background-position: center;
background-repeat: no-repeat;
background-size: cover;
height:100vh;
`
const Card=styled.div`
color: white !important;
width:80%;
margin:auto;
padding:1rem;
backdrop-filter: blur(6px);
border-radius:25px;
`
const Title=styled.h2`
margin:1rem 0 0 0;
text-align: center;
`;
const Dashboard = () => {
  return (
    <Container>
      <Card variant="outlined">
        <Title>Bomb Finance Summary</Title>
        <hr/>
      
      <div style={{width:"100%",display:"flex",justifyContent:"space-between",margin:"auto"}}>
        <div style={{width:"40%"}}>
          <Table/>
        </div>
        <div style={{width:"20%",flexDirection: "column",textAlign:"center",color:"white",padding:"10px"}}>
          <p style={{fontSize:"16px", margin:"0",fontWeight:"100"}}>Current Epoch</p>
          <p style={{fontSize:"32px",margin:"0"}}>258</p>
          <hr/>
          <p style={{fontSize:"32px",margin:"0"}}>03:38:36</p>
          <p style={{fontSize:"16px", margin:"0",fontWeight:"100"}}>Next Epoch in</p>
          <hr/>
          <p style={{fontSize:"16px", margin:"0",fontWeight:"100",padding:"2px"}}>Live TWAP:1.17</p>
          <p style={{fontSize:"16px", margin:"0",fontWeight:"100",padding:"2px"}}>TVL:$5,002,412</p>
          <p style={{fontSize:"16px", margin:"0",fontWeight:"100",padding:"2px"}}>Last Epoch TWAP:1.22</p>
        </div>
      </div>
      </Card>
      
      
    </Container>
  );
};
export default Dashboard;
