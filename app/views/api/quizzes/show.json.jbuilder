json.name @quiz.name
json.questions @quiz.questions do |question|
  json.id question.id
  json.question question.question
  json.answer do
    json.array! question.answers do |answer|
      json.id answer.id
      json.answer answer.answer
      json.correct answer.correct
    end
  end

end
