class Api::QuizzesController < ApplicationController

  before_action :redirect_unless_logged_in

  def index
    @quizzes = current_user.quizzes
  end

  def show
    @quiz = Quiz.includes(questions: :answers).find(params[:id])
  end

end
