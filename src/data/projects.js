import reFresh from '../images/reFresh.png';
import GradeCalculator from '../images/GradeCalculator.png';
import jTrivia from '../images/jTrivia.png';

const projects = [
  {
      'title': 'reFresh',
      'image': reFresh,
      'description': 'A web app that manages weekly meal plans in an effort to minimize food and grocery waste',
      'technologies': [
          'Python',
          'Flask',
          'Spoonacular API',
          'Bootstrap 4'
      ],
      'githubLink': 'https://github.com/costajoshua27/reFresh',
      'liveLink' : '',
      'notable': 'Winner of the Walmart API Contest for CalHacks 6.0',
      'id': 1
  },
  {
      'title': 'GradeCalculator',
      'image': GradeCalculator,
      'description': 'A simple grade calculator GUI built with Python',
      'technologies': [
          'Python',
          'Tkinter'
      ],
      'githubLink': 'https://github.com/costajoshua27/GradeCalculator',
      'liveLink' : '',
      'notable': '',
      'id': 2
  },
  {
      'title': 'jTrivia',
      'image': jTrivia,
      'description': 'A trivia web app that allows you to view Jeopardy! questions by specified category',
      'technologies': [
          'Python',
          'Flask',
          'jService API',
          'Bootstrap 4'
      ],
      'githubLink': 'https://github.com/costajoshua27/jTrivia',
      'liveLink' : 'http://costajoshua27.pythonanywhere.com',
      'notable': 'Accepted Submission to the January 2020 Capital One Software Engineering Summit (SES)',
      'id': 3
  }
];

export default { projects };