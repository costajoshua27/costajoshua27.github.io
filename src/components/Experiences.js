import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight, faDotCircle, faCircle } from '@fortawesome/free-solid-svg-icons';


class Experiences extends Component {

  constructor(props) {
    super(props);
    this.state = {
      experiences: this.props.experiences,
      index: 0
    };
    this.createCircles = this.createCircles.bind(this);
    this.goLeft = this.goLeft.bind(this);
    this.goRight = this.goRight.bind(this);
  }

  goLeft = () => {
    if (this.state.index !== 0) {
      this.setState((state, props) => ({
        index : state.index - 1
      }));
    }
  }

  goRight = () => {
    if (this.state.index < this.state.experiences.length - 1) {
      this.setState((state, props) => ({
        index : state.index + 1
      }));
    }
  }

  createCircles = () => {
    let circles = [];
    for (let i = 0; i < this.state.experiences.length; ++i) {
      circles.push(faCircle);
    }
    circles[this.state.index] = faDotCircle;
    return circles;
  }

    render() {
      let current_experience = this.state.experiences[this.state.index];
        // return (
        //     <div className="experience-panel" id="experiences">
        //         <h1 className="font-primary">Experiences</h1>
        //         <div className="experience">
        //             <p className="experience-title font-primary">{current_experience['incoming'] ? 'Incoming' : ''} {current_experience['title']}</p>
        //             <p className="experience-company font-secondary">{current_experience['company']}</p>
        //             <p className="experience-when font-secondary">{current_experience['when']} {current_experience['current'] ? ' - Current' : ''}</p>
        //         </div>
        //         <div className="experience-panel-controller">
        //             <FontAwesomeIcon onClick={this.goLeft} className="experience-panel-icon experience-panel-arrow" icon={faArrowCircleLeft} />
        //             {this.createCircles().map((circle, index) => (<FontAwesomeIcon key={index} className="experience-panel-icon" icon={circle} />))}
        //             <FontAwesomeIcon onClick={this.goRight} className="experience-panel-icon experience-panel-arrow" icon={faArrowCircleRight} />
        //         </div>
                
        //     </div>
        // )

        return (
          <div className="container section" id="experiences">
            <h3 className="speech-bubble-left bouncySlow" id="experiencesHeader">These are my work experiences!</h3>
            
            <div className="experience">
              <h2 className="experience-title">{current_experience['title']}</h2>
              <h3 className="experience-company">{current_experience['company']}</h3>
              <p className="experience-when">{current_experience['when']} {current_experience['current'] ? ' - Current' : ''}</p>
              <div className="experience-panel-controller">
                <FontAwesomeIcon onClick={this.goLeft} className="experience-panel-icon experience-panel-arrow" icon={faArrowCircleLeft} />
                {this.createCircles().map((circle, index) => (<FontAwesomeIcon key={index} className="experience-panel-icon" icon={circle} />))}
                <FontAwesomeIcon onClick={this.goRight} className="experience-panel-icon experience-panel-arrow" icon={faArrowCircleRight} />
              </div>
            </div>
          </div>
        );
    }
    
}

// PropTypes
Experiences.propTypes = {
    experiences: PropTypes.array.isRequired,
}

export default Experiences;