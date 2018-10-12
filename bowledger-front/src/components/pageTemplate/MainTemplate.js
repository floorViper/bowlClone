import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import MainHeader from './MainHeader';
import MainSidebar from './MainSidebar';
import Breadcrumb from './Breadcrumb';
//import Aside from "../../components/Aside/";
import Footer from './Footer';

//import Dashboard from "../../views/Dashboard/";

const MainTemplate = ({ children }) => {
  return (
    <div className="app">
      <MainHeader />
      <div className="app-body">
        <MainSidebar />
        <main className="main">
          <Breadcrumb />
          <Container fluid>{children}</Container>
        </main>
        {/* <Aside /> */}
      </div>
      <Footer />
    </div>
  );
};

export default MainTemplate;
