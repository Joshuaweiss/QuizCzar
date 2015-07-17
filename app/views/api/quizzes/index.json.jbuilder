json.array! @quizzes do |quiz|
  json.name quiz.name
  json.id quiz.id
  json.last_updated quiz.updated_at
end
