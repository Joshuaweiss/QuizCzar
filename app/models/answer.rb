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

  validates :answer, :correct, :question_id, presence: true

  belongs_to :question

end
