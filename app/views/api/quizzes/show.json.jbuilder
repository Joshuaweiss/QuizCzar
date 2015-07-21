json.name @quiz.name
json.id @quiz.id
json.updated_at @quiz.updated_at

if @high_score
  json.high_score do
    json.correct_answers @high_score.correct_answers
    json.number_of_questions @high_score.number_of_questions
    json.user_id @high_score.user_id
    json.quiz_id @high_score.quiz_id
    json.updated_at @high_score.updated_at
    json.created_at @high_score.created_at
  end
end

if @grades
  json.grades do
    json.array! @grades do |grade|
      json.partial! "api/grade", grade: grade
    end
  end
end

json.user do
  json.id @quiz.user.id
  json.name @quiz.user.name
end

json.questions @quiz.questions do |question|
  json.id question.id
  json.question question.question
  json.answers do
    json.array! question.answers do |answer|
      json.id answer.id
      json.answer answer.answer
      json.correct answer.correct
    end
  end

end
