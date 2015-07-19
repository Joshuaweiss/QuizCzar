class Api::GradesController < ApplicationController

  def create
    quiz = Quiz.find(params[:quiz_id])
    render json: {correct_answers: quiz.grade(params[:answers])}
  end

  def index

  end

end
