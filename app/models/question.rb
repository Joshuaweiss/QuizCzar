# == Schema Information
#
# Table name: questions
#
#  id       :integer          not null, primary key
#  question :string           not null
#  quiz_id  :integer          not null
#

class Question < ActiveRecord::Base

  validates :quiz_id, presence: true

  belongs_to :quiz
  has_many :answers, dependent: :destroy
  has_one :user, through: :quiz

  def add_default_answers()
    self.answers.create!({answer: "", correct: true});
    3.times do
      self.answers.create!({answer: "", correct: false});
    end

    self
  end

end
