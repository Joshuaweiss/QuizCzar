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

  validates :question_id, presence: true
  validates :correct, inclusion: [true, false]
  validate :fourOrLess

  belongs_to :question
  has_one :user, through: :question

  def fourOrLess()
    if !self.id && self.question.answers.length >= 4
      errors.add(:answers, "too many answers");
    end
  end

end
