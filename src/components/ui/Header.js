import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import AuthContext from '../../store/auth-context';
import logo from '../../assets/online-shop.png';
import user from '../../assets/user.png';
import { AiFillHome } from 'react-icons/ai';
import { CgShoppingCart } from 'react-icons/cg';
import { FaBoxOpen, FaChartBar } from 'react-icons/fa';
import './Header.css';

const Header = () => {

  const auth = useContext(AuthContext);

  return (
    <header className="bg-white">
      <nav className="navbar navbar-expand-xl p-0">
        <div className="container-fluid px-3 px-xl-5">
          <div className="navbar-brand">
            <Link to="/"><img className="navbar-brand-item" src={logo} alt="icon" width="32" height="32" /></Link>
          </div>
          <div className="navbar-collapse collapse justify-content-center">
            <ul className="navbar-nav navbar-nav-scroll">
              <li className="nav-item"><Link to="/" className="nav-link nav-link-item"><AiFillHome className="me-1 mb-1" />Home</Link></li>
              <li className="nav-item"><Link to="/products" className="nav-link nav-link-item" state={{ title: "Product List" }}><FaBoxOpen className="me-1 mb-1" />Product</Link></li>
              <li className="nav-item"><Link to="/topViewProduct" className="nav-link nav-link-item"><FaChartBar className="me-1 mb-1" />Top View Product</Link></li>
            </ul>
          </div>
          <div className="text-end">
            <ul className="navbar-nav navbar=nav-scroll">
              <li className="nav-item"><Link to="/cart" className="nav-link nav-link-item"><CgShoppingCart className='me-1 mb-1' style={{ width: "30px", height: "30px" }} />Cart</Link> </li>
            </ul>
          </div>
          {auth.isLoggedIn ? (
            <Dropdown>
              <Dropdown.Toggle as="image">
                <img src={user} alt="user" width="38" height="38" className="rounded-circle" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow">
                <Dropdown.ItemText className="px-3">
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <img className="rounded-circle shadow" src={user} alt="user" width="42" height="42" />
                    </div>
                    <div>
                      <h6 className="m-0">{auth.userData.fname + " " + auth.userData.lname}</h6>
                      <p className="small m-0">{auth.userData.email}</p>
                    </div>
                  </div>
                  <hr />
                </Dropdown.ItemText>
                <Dropdown.Item as={Link} to={`/User/${auth.userData.email}/profile`} state={{ title: "My Profile" }}><i className="bi bi-person me-2" />Profile</Dropdown.Item>
                <Dropdown.Item className="bg-danger-soft-hover" onClick={auth.logout}><i className="bi bi-power fa-fw me-2" />Sign out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div className="text-end">
              <Link to="/login"><button type="button" className="btn btn-dark me-2">Login</button></Link>
              <Link to="/signup"><button type="button" className="btn btn-warning">Sign Up</button></Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header;