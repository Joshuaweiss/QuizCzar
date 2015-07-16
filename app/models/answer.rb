# == Schema Information
#
# Table name: answers
#
#  id          :integer          not null, primary key
#  answer      :string           not null
#  correct     :boolean          not null
#  question_id :integer          not null
#

class Answer < ActiveRecord::Base

  validates :answer, :question_id, presence: true
  validates :correct, inclusion: [true, false]

  belongs_to :question

end
