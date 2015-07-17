json.name @quiz.name
json.updated_at @quiz.updated_at
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
