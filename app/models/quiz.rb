# == Schema Information
#
# Table name: quizzes
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  user_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class Quiz < ActiveRecord::Base

  validates :name, :user_id, presence: true

  belongs_to :user
  has_many :questions, dependent: :destroy
  has_many :grades, dependent: :destroy


  def grade(answers)
    questions = self.questions.all
    question_count = questions.count
    correct_answers = 0
    questions.each do |question|
      answer_id = answers[question.id.to_s].to_i
      answer = question.answers.find_by(id: answer_id)
      correct_answers += 1 if answer && answer.correct
    end

    grade = grades.new(
      correct_answers: correct_answers,
      number_of_questions: question_count
    )

    return grade
  end

end
