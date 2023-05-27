import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <img onClick={openMenu} className="user-img clickable" src={user.profile_image_url} alt="" />
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <span>Hello, {user.username}!</span>
            <span>{user.email}
            </span>
            <span className="log-out clickable site-color-b" onClick={handleLogout}>Log Out</span>
          </>
        ) : null}
      </div>
    </>
  );
}

export default ProfileButton;
