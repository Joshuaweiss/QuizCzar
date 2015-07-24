class QuestionCanBeBlank < ActiveRecord::Migration
  def change
    change_column :questions, :question, :string, null: true
  end
end
