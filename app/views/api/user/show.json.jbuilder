json.name @user.name
json.id @user.id
json.picture_url asset_url(@user.picture.url)

json.quizzes do
  json.partial! 'api/quizzes/index', quizzes: @user.quizzes, user: @user
end
