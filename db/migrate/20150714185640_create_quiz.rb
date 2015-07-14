class CreateQuiz < ActiveRecord::Migration
  def change
    create_table :quizzes do |t|
      t.string :name, null: false
      t.integer :user_id, null: false
    end
    add_index :quizzes, :user_id
  end
end
