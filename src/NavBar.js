import {
    Nav,
    NavLink,
    Bars,
    NavMenu
  } from './NavbarElements';


const NavBar = () => {
    return (

        <>
      <Nav>
        <Bars />
  
        <NavMenu>
          <NavLink to='/' activeStyle>
            Home
          </NavLink>
          <NavLink to='/login' activeStyle>
            Login
          </NavLink>
          <NavLink to='/gallery' activeStyle>
            Gallery
          </NavLink>
          <NavLink to='/contact' activeStyle>
            Contact
          </NavLink>
          
        </NavMenu>
      </Nav>
    </>
        
    );
}
 
export default NavBar;