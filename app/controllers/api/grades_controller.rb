class Api::GradesController < ApplicationController

  def create
    quiz = Quiz.find(params[:quiz_id])
    grade = quiz.grade(params[:answers])
    grade.user = current_user
    grade.save!
    @quizzes = current_user.grades.where(quiz_id: params[:quiz_id])
    render json: @quizzes
  end

  def index
    @quizzes = current_user.grades.where(quiz_id: params[:quiz_id])
    render json: @quizzes
  end

end
