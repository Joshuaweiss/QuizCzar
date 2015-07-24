class QuizDoesNotNeedName < ActiveRecord::Migration
  def change
    change_column :quizzes, :name, :string, :null => true
    add_index :quizzes, :name
  end
end
