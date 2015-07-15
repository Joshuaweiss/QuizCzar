# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


josh = User.create({ name: "Josh", email: "joshua@josh.com", password: "asdfasdf" })
music_theory_quiz = josh.quizzes.create({name: "Music Theory"})

q1 = music_theory_quiz.questions.create({question: "B Major"})
q1_a1 = q1.answers.create({answer: "5 Sharps", correct: true})
q1_a2 = q1.answers.create({answer: "1 Sharps", correct: false})
q1_a3 = q1.answers.create({answer: "3 Sharps", correct: false})
q1_a4 = q1.answers.create({answer: "3 flats", correct: false})


q2 = music_theory_quiz.questions.create({question: "A Major"})
q2_a1 = q1.answers.create({answer: "5 Sharps", correct: false})
q2_a2 = q1.answers.create({answer: "1 Sharps", correct: false})
q2_a3 = q1.answers.create({answer: "3 Sharps", correct: true })
q2_a4 = q1.answers.create({answer: "3 flats", correct: false})
