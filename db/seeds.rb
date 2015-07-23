




josh = User.find_by(email: "joshua@josh.com") || User.create(name: "Josh", email: "joshua@josh.com", password: "asdfasdf" )
music_theory_quiz =  Quiz.find_by(name: "Music Theory") || josh.quizzes.create(name: "Music Theory")

q1 = Question.find_by(question: "B Major") || music_theory_quiz.questions.create(question: "B Major")
q1.answers.create([
  {answer: "5 Sharps", correct: true},
  {answer: "1 Sharps", correct: false},
  {answer: "3 Sharps", correct: false},
  {answer: "3 flats", correct: false}
])


q2 = Question.find_by(question: "A Major") || music_theory_quiz.questions.create(question: "A Major")
q2.answers.create([
  {answer: "5 Sharps", correct: false},
  {answer: "1 Sharps", correct: false},
  {answer: "3 Sharps", correct: true},
  {answer: "3 flats", correct: false}
])
