json.name @user.name

json.quizzes do
  json.partial! 'api/quizzes/index', quizzes: @user.quizzes, user: @user
end
