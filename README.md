## Overview
I completed this solo project as part of the General Assembly Software Engineering Immersive course. The course was split into four modules, and this was my submission for the final module. During module four, we learnt how to use Django - a back end framework for Python. Having already used Python for various different projects prior to the course, I was pleased to have the opportunity to apply my knowledge of Python in a different way. The finished project is to be deployed with Netlify and Heroku. This is the front end repository, the back end can be found [here](https://github.com/tigeryant/sei-project-four-be).

<p align="center">
  <img src="https://i.imgur.com/eqBONp7.jpg" height="450px"></img>
  <p>

## Brief
We were tasked with using the skills we had learnt throughout the twelve week course to build a full stack web application using React, Django, the Django REST framework and PostgreSQL. As we were given free reign over which CSS framework we used (if at all), I chose to use Bootstrap. We were also allowed to choose whether we worked in groups, pairs or solo. I decided to work solo, so that I could test my abilities in all areas - front and back end.
  
## Timeframe
While there was no ‘hard’ deadline set for the final version, we were given one week to produce a minimum viable product (MVP).
  
## Technologies used
* React.js
* Django
* Django REST framework
* PostgreSQL
* Bootstrap
* JSON Web Tokens
* Git
* GitHub

## Approach
For this project, I knew I wanted to find a way to blend my interest in cryptography with the skills I had learnt throughout the course. Cryptography is a somewhat esoteric and arcane field. Yet, in light of the emergence of cryptocurrencies in recent years, an understanding of this subject is becoming increasingly more important in society. This led me to the decision to build CryptoAcademy, a Coursera/Udacity/Udemy style web app that allows users to browse and enrol on courses related to mathematical cryptography.
  
## Planning
I began my initial planning by taking some general notes with pen and paper. I did this to try and pin down exactly what functionality I wanted to include in the MVP, and what features I wanted to include as ‘stretch goals’. Ultimately I decided to give the app the following pages/features:
* Landing page
* Index page
* Show page (with a hero banner, overview, skills, prerequisites, instructor, syllabus, reviews)
* Full syllabus page
* Navbar and footer on each page
* User authentication
  
### Wireframes
I then used Figma to produce the following wireframe diagrams:
  
<p align="center">
  <img src="https://i.imgur.com/xyjnyC5.png" height="350px"></img>
  <img src="https://i.imgur.com/zZQfL2F.png" height="350px"></img>
  <img src="https://i.imgur.com/GLvMx8p.png" height="350px"></img>
  <img src="https://i.imgur.com/8t6oLM3.png" height="350px"></img>
  <img src="https://i.imgur.com/yCfKiSt.png" height="350px"></img>
  <p>
  
### Entity Relationship Diagram
During the planning phase, I also thought about the relationships between models in the database. This involved careful consideration of the difference between one-to-one, one-to-many and many-to-many relationships. Finally, I drew this Entity Relationship Diagram (ERD) to express the structure of the database:
  
<p align="center">
  <img src="https://i.imgur.com/zQUi0Sm.png" height="400px"></img>
  <p>
  
## Build
### Back end
I spent the first two days focusing purely on the back end. This involved building models and serializers, setting up routes and user authentication, and performing data entry. Here are two examples of models I built - the ‘Course’ and ‘Review’:

```python
class Course(models.Model):
   '''Course Model'''
   name = models.CharField(max_length=100, unique=True)
   image = models.CharField(max_length=300)
   length = models.PositiveIntegerField()
   overview = models.TextField(max_length=300)
   prerequisites = models.ManyToManyField('self')
   instructor_name = models.CharField(max_length=100)
   instructor_image = models.CharField(max_length=300)
   instructor_bio = models.TextField(max_length=300)

   def __str__(self):
       return f'{self.name}'

class Review(models.Model):
   ''' Review Model '''
   content = models.TextField(max_length=300)
   rating = models.PositiveIntegerField()
   course = models.ForeignKey(
       Course,
       related_name='reviews',
       on_delete=models.CASCADE
   )
   owner = models.ForeignKey(
       'jwt_auth.User',
       related_name='reviews_posted',
       on_delete=models.CASCADE
   )

   def __str__(self):
       return f'Review {self.id} of Course {self.course}'
```

Their respective serializers, for parsing data as it is stored in and retrieved from the database, were built like this:
```python
class CourseSerializer(serializers.ModelSerializer):
   ''' Serializer for outgoing course response '''
   reviews = ReviewSerializer(many=True, read_only=True)
   weekly_syllabuses = WeeklySyllabusSerializer(many=True, read_only=True)
   skills = SkillSerializer(many=True, read_only=True)

   class Meta:
       model = Course
       fields = '__all__'

class NestedUserSerializer(serializers.ModelSerializer):
   ''' Serializer for users '''
  
   class Meta:
       model = User
       fields = ('id', 'username', 'email') 

class ReviewSerializer(serializers.ModelSerializer):
   ''' Serializer for reviews '''
  
   class Meta:
       model = Review
       fields = '__all__' 

class NestedReviewSerializer(serializers.ModelSerializer):
   ''' Serializer for nested reviews '''
   owner = NestedUserSerializer()

   class Meta:
       model = Review
       fields = '__all__'
```
  
The routes for interacting with the API were set up as follows:
```python
urlpatterns = [
   path('', CourseListView.as_view()),
   path('<int:pk>/', CourseDetailView.as_view()),
   path('<int:pk>/reviews/', ReviewListView.as_view()),
   path('<int:course_pk>/reviews/<int:pk>/', ReviewDetailView.as_view())
]
```

Part of the user authentication process involved using JSON Web Tokens to verify the user. The snippet below shows how user authentication works on the back end:
```python
class JWTAuthentication(BasicAuthentication):
   def authenticate(self, request):
       header = request.headers.get('Authorization')
  
       if not header:
           return None
  
       if not header.startswith('Bearer'):
           raise PermissionDenied({'detail':'Invalid Auth Header'})
  
       token = header.replace('Bearer ', '')
       try:
           payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
           user = User.objects.get(pk=payload.get('sub'))
       except jwt.exceptions.InvalidTokenError:
           raise PermissionDenied({'detail':'Invalid Token Error'})
       except User.DoesNotExist:
           raise PermissionDenied({'detail':'User Not Found'})

       return (user, token)
```
  
  
### Front end
After I had completed most of the work on the back end, I set about connecting the client and server side software. On the front end, I used the React framework. I set up each component so that it displayed some placeholder text. Once I was satisfied that each component was working correctly, I set up React hooks that made API calls from the index, show and syllabus page to retrieve information. Two of the hooks I used that are worthy of note were implemented in the show page (the CourseShow.js component). The following hook retrieves the data relating to the course being shown.
  
```javascript
 React.useEffect(() => {
   const getData = async () => {
     try {
       const res = await getSingleCourse(courseId)
       res.data.weeklySyllabuses.map((syllabus) => {
         if (syllabus.week === 1) {
           syllabus.isFirstWeek = true
         } else {
           syllabus.isFirstWeek = false
         }
       })
       setCourse(res.data)
     } catch {
       console.error('error fetching course data')
     }
   }
   getData()
 }, [courseId])

```
  
Each course may have ‘prerequisite’ courses that are also displayed on the show page. For example, a student should learn about number theory and abstract algebra before they take the course on elliptic curves. The following hook fetches the course prerequisites, making use of promises to wait until all the data has been fetched before setting a state variable that contains this data.
  
```javascript
 // FETCH COURSE PREREQUISITES
 React.useEffect(() => {
   if (course) {
     const promises = course.prerequisites.map((id) => getSingleCourse(id))
     Promise.all([...promises])
       .then((values) => values.map((value) => value.data))
       .then((data) =>
         data.map((course, index) =>
           index === 0
             ? { ...course, isFirstSlide: true }
             : { ...course, isFirstSlide: false }
         )
       )
       .then((data) => setPrereqs(data))
   }
 }, [course])
```
  
### Styling
This project gave me a great opportunity to practise using the Bootstrap CSS framework to create a modern and responsive design. I learnt a great deal about Bootstrap utility and layout classes, including breakpoints, containers, icons and the grid system. I also tried out a lot of built in components, such as cards, accordions, list groups, breadcrumbs and heroes. Containers and the grid system in particular helped to develop a responsive application. The best example of extensive use of Bootstrap for styling is the show page. It features two navbars, a hero, a breadcrumb, a carousel, a list group and an accordion.
  
## Known bugs
This project is still a work in progress, so some features still need to be implemented or modified. While user authentication works on the back end, this functionality still needs to be implemented on the front end. This should not be too big a challenge as it will only involve building form components for login and registration, as well as making two API calls. 
A slightly more time consuming task (though not very difficult either) that needs to be done is data entry for each of the courses. This involves adding their name, image, description, syllabus information and more.
A minor styling issue that needs to be addressed is the displaying of the images on the carousel. They need to be displayed with uniform sizing, but they are currently displayed in an irregular way.

  
## Challenges
One of the biggest challenges I faced during this project was building a useEffect hook to retrieve the prerequisites data on the show page. My initial approach was to set the ‘prerequisites’ state after each individual API call to retrieve the prerequisite data. This turned out to be very inefficient as the API was being called far more than necessary, and each state update was causing a re-render. After realising how inefficient this was, I used JavaScript promises to call the API once for each prerequisite, waiting for the data to be returned, and then assigning the data to the prerequisites state variable afterwards. This is the hook that calls the API and sets the state:
  
```javascript
 // FETCH COURSE PREREQUISITES
 React.useEffect(() => {
   if (course) {
     const promises = course.prerequisites.map((id) => getSingleCourse(id))
     Promise.all([...promises])
       .then((values) => values.map((value) => value.data))
       .then((data) =>
         data.map((course, index) =>
           index === 0
             ? { ...course, isFirstSlide: true }
             : { ...course, isFirstSlide: false }
         )
       )
       .then((data) => setPrereqs(data))
   }
 }, [course])

```
  
Another challenge I faced was displaying the carousel on the show page. Initially, I tried to use a Bootstrap carousel component. This proved more difficult than expected, as it threw an error each time the carousel reached the end of its first display cycle. Following this, I used the react-slick package instead. Here is the implementation of the carousel using react-slick:
  
```javascript
const Prerequisites = ({ slides }) => {
 const settings = {
   arrows: true,
   dots: true,
   infinite: true,
   speed: 500,
   slidesToShow: 1,
   slidesToScroll: 1,
 }
 return (
   <section id="prerequisites" className="pb-5">
     <h2 style={{ display: "inline" }}><i className="bi bi-file-earmark-check"></i>Prerequisites</h2>
     <div>
       <Slider {...settings}>
         {slides.map((slide) => (
           <div key={slide.id} className="slide-container" >
             <img src={slide.image} alt="" />
           </div>
         ))}
       </Slider>
     </div>
   </section>
 )
}
```
  
## Wins
One of the biggest wins I got from this project was gaining the confidence to build a full stack app from scratch. I was confident that I understood how each part of the application worked, both on the front and back end, and at multiple levels of abstraction.
  
## Future Features
Future developments could include the following: an FAQs section, a further reading page and email notification system that sends an email to the user when they register for the first time and when they enrol on a course.
  
## Key Learnings
This was an interesting project which consolidated my knowledge in all the technologies I had learnt throughout the course, but most notably in Django and Bootstrap. It was very valuable to see the different trade offs that have to be made when selecting a back end framework.
Another notable example of something I learnt was promises. Before this project, I had only understood how promises worked in a hypothetical sense. It was extremely beneficial to be able to apply this knowledge in a practical way. 
