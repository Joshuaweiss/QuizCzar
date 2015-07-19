# == Schema Information
#
# Table name: grades
#
#  id                  :integer          not null, primary key
#  correct_answers     :integer          not null
#  number_of_questions :integer          not null
#  quiz_id             :integer          not null
#  user_id             :integer          not null
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#

class Grade < ActiveRecord::Base

  validates :correct_answers,
            :number_of_questions,
            :quiz_id,
            :user_id,
            presence: true

  belongs_to :quiz
  belongs_to :user

end
