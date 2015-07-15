json.name @quiz.name
json.questions @quiz.questions do |question|

  json.question question.question
  json.answer do
    json.array! question.answers do |answer|
      json.answer answer.answer
      json.correct answer.correct
    end
  end

end
