# Readme for SEI project 4 - CryptoAcademy
## Introduction
I completed this solo project as part of the General Assembly Software Engineering Immersive course. The course was split into four modules, and this was my submission for the final module. During module four, we learnt how to use Django - a back end framework for Python. Having already used Python for various different projects prior to the course, I was pleased to have the opportunity to apply my knowledge of Python in a different way. The finished project was deployed with Netlify and Heroku, and can be found (here, insert link to deployed project). This is the front end repository, the back end can be found [here](https://github.com/tigeryant/sei-project-four-be).

## Aim
We were tasked with using the skills we had learnt throughout the twelve week course to build a full stack web application using React, Django, the Django REST framework and PostgreSQL. As we were given free reign over which CSS framework we used (if at all), I chose to use Bootstrap. We were also allowed to choose whether we worked in groups, pairs or solo. I decided to work solo, so that I could test my abilities in all areas - front and back end. 

Driven by my interest in cryptography, I decided to build a website that allows users to browse and enrol on cryptography courses. 

## Planning
Before the project started we had to do some planning, and one aspect of this was the creation of an Entity Relationship Diagram (ERD). This was very useful, as it taught me a lot about relationships between models in a database, such as many-to-many, one-to-many and one-to-one. One relationship presented an interesting challenge to implement was the ‘Prerequisites’ many-to-many relationship between a ‘Course’ model and other models of the same type.

<p align="center">
  <img src="https://i.imgur.com/H4pa2bm.png" height="350px"></img>
  </p>

## Structure
The app has a landing page, and index page for viewing all the courses, a show page which displays an individual course and a syllabus page which displays the full syllabus of an individual course. 

## Front end
The front end uses the React framework. This project gave me more practise at using React hooks and I also learnt about some more advanced aspects of JavaScript. My ability to use Bootstrap improved, too. In particular, I learnt how to use Bootstrap navbars, accordions, breadcrumbs, icons, list groups, containers and the Bootstrap grid system.

## Back end
This was my first time using Django and the Django REST framework. This was an interesting experience as Django is a very opinionated framework, whereas Express, which I had used for the previous project, is unopinionated. I found that it was faster to build with Django, but harder to customise. I encountered a particular example of this when I tried to edit the custom user model. For authentication I used the json web tokens and for the database I used PostgreSQL.

## Future developments
This project is still a work in progress; there are several pieces of functionality still due to be implemented.

## Key take-aways and conclusion
This was an interesting project which consolidated my knowledge in all the technologies I had learnt throughout the course, but most notably in Django and Bootstrap. It was very valuable to see the different trade offs that have to be made when selecting a back end framework. Another important aspect is that I became more confident in my ability to build full stack applications by myself. 
