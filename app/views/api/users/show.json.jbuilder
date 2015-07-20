json.name @user.name
json.id @user.id

json.quizzes do
  json.partial! 'api/quizzes/index', quizzes: @user.quizzes, user: @user
end
