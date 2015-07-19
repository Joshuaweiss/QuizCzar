# Quiz Czar

[Heroku link][heroku]

[heroku]: http://quizczar.herokuapp.com

## Minimum Viable Product
QuizCzar is a StudyBlue clone, built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [X] Create accounts
- [X] Create sessions (log in)
- [X] Create quizzes with questions
- [X] Play quizzes
- [ ] See progress
- [ ] Bookmark quizzes
- [ ] Search for quizzes by title and author
- [ ] Search for quizzes by topics
- [ ] Have a profile page with there quizzes
- [ ] See there recently viewed quizzes

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Data Modeling (~2 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. I will add API routes to serve quizzes and post data as JSON, and then add Backbone
models and collections that fetch that data from those routes.

[Details][phase-one]

### Phase 2: Create Quiz and Quiz Index (~2 days)
I will create backbone views. By the end of this phase the user should be able to create quizzes and see them within the show quiz index. The show index needs to be flexible. It is used in multiple pages on the site.

[Details][phase-two]


### Phase 3: Show Quiz and Take Quiz (~2 days)
I will create backbone views. By the end of this phase the user should be able to see quizzes and take them.

[Details][phase-three]

### Phase 4: Tag Quizzes with topics (~2 days)
I will allow create quizzes to be tagable. Feeds will index quizzes created with
a certain tag.

[Details][phase-four]

### Phase 5: User Feeds (~2 days)
I will create a quiz results page which allows users to see there score history and a recent quizzes page which shows recent quizzes viewed by the user.

[Details][phase-five]

### Phase 6: Searching for quizzes (~2 days)
Allow the user to search by quizzes names, authors, and there topics. The user should have their own page which lists their quizzes.

[Details][phase-six]

### Bonus Features (TBD)
- [ ] Review questions previously answered incorrectly
- [ ] Share quizzes through social media
- [ ] Share quiz score through social media
- [ ] Login with social media
- [ ] Infinite scroll in quiz search
- [ ] Improve progress tracking with more quiz history


[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
