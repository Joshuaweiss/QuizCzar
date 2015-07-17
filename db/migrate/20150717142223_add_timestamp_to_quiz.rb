class AddTimestampToQuiz < ActiveRecord::Migration
  def change
    add_column(:quizzes, :created_at, :datetime)
    add_column(:quizzes, :updated_at, :datetime)
  end
end
