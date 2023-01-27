import React from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
const NavBar= (): JSX.Element =>{
    return(
        <div style={{width:'50%',height:'10%'}}>
            <h3>welcome to email application</h3>
            <NavLink tag={'link'} to='/'>Home</NavLink>
            <NavLink  tag={'link'} to='/login'>Login</NavLink>
        </div>
    )
}

export default NavBar;