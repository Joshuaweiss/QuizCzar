# == Schema Information
#
# Table name: quizzes
#
#  id         :integer          not null, primary key
#  name       :string
#  user_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#  edited     :boolean          default(TRUE), not null
#

class Quiz < ActiveRecord::Base

  include PgSearch

  belongs_to :user
  has_many :questions, dependent: :destroy
  has_many :grades, dependent: :destroy

  pg_search_scope :search,
                  against: :name,
                  associated_against: {user: :name}

  def grade(answers)
    questions = self.questions.all
    question_count = questions.count
    correct_answers = 0
    if answers
      questions.each do |question|
        answer_id = answers[question.id.to_s].to_i
        answer = question.answers.find_by(id: answer_id)
        correct_answers += 1 if answer && answer.correct
      end
    end

    grade = grades.new(
      correct_answers: correct_answers,
      number_of_questions: question_count
    )

    return grade
  end

end
