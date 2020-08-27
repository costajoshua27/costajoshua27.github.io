import React, { Component } from 'react';

import Navbar from './components/Navbar';
import Introduction from './components/Introduction';
import Experiences from "./components/Experiences";
import Projects from './components/Projects';
import Footer from './components/Footer';

import projectsData from "./data/projects";
import experiencesData from "./data/experiences";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: projectsData.projects,
      experiences: experiencesData.experiences
    };
  }

  render() {
      return (
              <div className="App">
                  <Navbar/>
                  <div className="main">
                      <Introduction />
                      <Experiences experiences={this.state.experiences} />
                      <Projects projects={this.state.projects} focusedProject={this.state.projects[0]}/>
                  </div>
                  <Footer/>
              </div>
      );
  }
}

export default App;
