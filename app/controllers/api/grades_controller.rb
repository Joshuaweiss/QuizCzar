class Api::GradesController < ApplicationController

  def create
    quiz = Quiz.find(params[:quiz_id])
    grade = quiz.grade(params[:answers])
    grade.user = current_user
    grade.save!
    render json:grade
  end

  def index

  end

end
