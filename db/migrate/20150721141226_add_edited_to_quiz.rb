class AddEditedToQuiz < ActiveRecord::Migration
  def change
    add_column :quizzes, :edited, :boolean, { default: true, null: false }
  end
end
