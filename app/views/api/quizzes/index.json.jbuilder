json.array! @quizzes do |quiz|
  json.name quiz.name
  json.id quiz.id
  json.last_updated quiz.updated_at

  high_score = @user.grades.where({quiz_id: quiz.id}).order("correct_answers DESC").first
  if high_score
    json.high_score do
      json.correct_answers high_score.correct_answers
      json.number_of_questions high_score.number_of_questions
      json.user_id high_score.user_id
      json.quiz_id high_score.quiz_id
      json.updated_at high_score.updated_at
      json.created_at high_score.created_at
    end
  end
end
