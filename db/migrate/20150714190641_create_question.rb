class CreateQuestion < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :question, null: false
      t.integer :quiz_id, null: false
    end
    add_index :questions, :quiz_id
  end
end
