class AnswerRemovePresenceValidation < ActiveRecord::Migration
  def change
    change_column_null(:answers, :answer, true)
  end
end
