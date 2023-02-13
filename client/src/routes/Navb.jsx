import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import axios from 'axios';

export default function Navb() {
  const [showBasic, setShowBasic] = useState(false);



  const handleLogout = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/auth/logout`, {
        withCredentials: true
      });
      window.location.reload();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='/home'>Home</MDBNavbarBrand>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/register'>
                Register
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/course'>Courses</MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='/instructor'>Instructors</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink href='/instructor'>
                <button onClick={() => handleLogout()}>
                Log Out
                </button>
            </MDBNavbarLink>
            </MDBNavbarItem>

            

           
      
          </MDBNavbarNav>

        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}