import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import { FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {

    const auth = useContext(AuthContext);

    return (
        <div className="mx-0">
            <div className="p-3 p-xl-0">
                <div className="bg-dark border p-3 w-100" style={{ borderRadius: '10px' }}>
                    <div className="list-group">
                        <Link className="list-group-item" to="profile" state={{ title: "My Profile" }}><i className="bi bi-ui-checks-grid fa-fw me-2"></i>Profile</Link>
                        <Link className="list-group-item" to="updatePass" state={{ title: "Update password" }}><i className="bi bi-pencil-square fa-fw me-2"></i>Update Password</Link>
                        <Link className="list-group-item" to="deleteProfile" state={{ title: "Delete Account" }}><i className="bi bi-trash fa-fw me-2"></i>Delete Account</Link>
                        <Link className="list-group-item text-danger bg-danger-soft-hover" to="/" onClick={auth.logout}><FaSignOutAlt /><i className="fas fa-sign-out-alt fa-fw me-2" />Sign Out</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;