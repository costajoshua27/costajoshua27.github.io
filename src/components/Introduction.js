import React from 'react';
import headshot from '../images/headshot.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

function Introduction() {
  return (
    <div className="container section" id="introduction">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <img id="headshot" className="whiteShadow" src={headshot} alt=""/>
          <h3 id="hello" className="speech-bubble-left bouncySlow">Hello, my name is Joshua Costa.</h3>
        </div>
        <div id="introductionText" className="col-lg-5 mx-lg-4 mt-lg-5">
          <p>
            I am an aspiring Software Engineer and
            a 3rd year Computer Science student at... 
            <span id="uci"> 
                <FontAwesomeIcon id="locationIcon" icon={faLocationArrow}/>
                UC Irvine!
            </span> 
          </p>
          <p>
              During my time in school, I've found
              myself becoming very passionate about
              Web Development, Software Engineering,
              Computer Science and the like.
          </p>
          <p>
            I'm usually learning something new and (hopefully)
            studying hard, but if not you can probably find me
            working out or playing basketball.
          </p>
          <p>
            If you would like to connect, feel free to checkout
            my socials, check out my resume, or e-mail me, all of which are linked above.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
