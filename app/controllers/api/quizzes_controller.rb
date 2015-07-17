class Api::QuizzesController < ApplicationController

  before_action :redirect_unless_logged_in

  def index
    @quizzes = current_user.quizzes
  end

  def show
    @quiz = Quiz.includes(questions: :answers).find(params[:id])
  end

  def update
    @quiz = Quiz.find(params[:id])
    unless current_user?(@quiz.user)
      render json: {}, status: 401
      return
    end

    if @quiz.update(quiz_params)
      render json: @quiz
    else
      render json: {}, status: :unprocessable_entity
    end

  end

  def create
    @quiz = current_user.quizzes.create({name: "Quiz Name"});
    render 'show';
  end

  private

  def quiz_params
    params.require(:quiz).permit(:name)
  end

end
