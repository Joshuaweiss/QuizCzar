json.id @question.id
json.question @question.question
json.answers do
  json.array! @question.answers do |answer|
    json.id answer.id
    json.answer answer.answer
    json.correct answer.correct
  end
end
