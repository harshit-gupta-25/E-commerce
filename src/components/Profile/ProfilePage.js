import React, { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import AuthContext from '../../store/auth-context';
import Sidebar from '../ui/Sidebar';
import user from '../../assets/user.png';
import './ProfilePage.css';

const ProfilePage = (props) => {

  const auth = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      <section className="bg-white pb-5">
        <div className="container-fluid px-0">
          <div className="profile-header rounded-0" />
        </div>
        <div className="container mt-n4">
          <div className="row">
            <div className="col-12">
              <div className="card bg-transparent card-body p-0" style={{ border: "none" }}>
                <div className="row d-flex justify-content-between">
                  <div className="col-auto mt-4 mt-md-0">
                    <div className="avatar-xxl mt-n3">
                      <img className="avatar-img rounded-circle border border-white border-3 shadow" src={user} alt="" />
                    </div>
                  </div>
                  <div className="col d-md-flex justify-content-between align-items-center mt-4">
                    <div className="pb-4">
                      <h1 className="my-1 fs-3 fw-bold">{auth.userData.fname + " " + auth.userData.lname} <i className="bi bi-patch-check-fill text-info small"></i></h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-5 bg-white">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 pt-4">
              <Sidebar />
            </div>
            <div className="col-xl-9">
              <Card className="border bg-transparent">
                <Card.Header className="border-bottom bg-transparent py-3">
                  <h3>{location.state.title}</h3>
                </Card.Header>
                <Card.Body>
                  <Outlet />
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProfilePage;