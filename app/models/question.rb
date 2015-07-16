# == Schema Information
#
# Table name: questions
#
#  id       :integer          not null, primary key
#  question :string           not null
#  quiz_id  :integer          not null
#

class Question < ActiveRecord::Base

  validates :question, :quiz_id, presence: true

  belongs_to :quiz
  has_many :answers
  has_one :user, through: :quiz

end
