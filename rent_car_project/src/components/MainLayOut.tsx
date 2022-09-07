import React, { Component, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


export const MainLayOut = () => {
  //เลือกpartแรก
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/FristHome");
  }, []);

  return (
    <div>
      <Navbar />
      <section>
        <div className="comtainer">
          <div className="row">
            <div className="col s12 m5 l3">
              <>555555555</>
            </div>
            <div className="col s12 m8 l9">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
