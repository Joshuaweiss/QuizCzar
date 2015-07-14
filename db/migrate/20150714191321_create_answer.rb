class CreateAnswer < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.string :answer, null: false
      t.boolean :correct, null: false
      t.integer :question_id, null: false
    end
    add_index :answers, :question_id
  end
end
