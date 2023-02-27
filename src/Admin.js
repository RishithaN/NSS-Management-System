import {
    Nav,
    NavLink,
    Bars,
    NavMenu
  } from './NavbarElements';


const Admin = () => {
    return (

        <>
      <Nav>
        <Bars />
  
        <NavMenu>
         
          <NavLink to='/meet-upload' activeStyle>
            New Meet/Manual details Upload
          </NavLink>
          <NavLink to='/meet-view' activeStyle>
            View Meet/Manual details
          </NavLink>
          <NavLink to='/units' activeStyle>
            Manage Units
          </NavLink>
          
        </NavMenu>
      </Nav>

      <h1>Welcome to Admin page</h1>
    </>
        
    );
}
 
export default Admin;