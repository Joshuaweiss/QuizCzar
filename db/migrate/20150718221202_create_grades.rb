class CreateGrades < ActiveRecord::Migration
  def change
    create_table :grades do |t|
      t.integer :correct_answers, null: false
      t.integer :number_of_questions, null: false
      t.integer :quiz_id, null:false
      t.integer :user_id, null:false

      t.timestamps null: false
    end

    add_index :grades, :quiz_id
    add_index :grades, :user_id
  end
end
