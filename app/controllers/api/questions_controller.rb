class Api::QuestionsController < ApplicationController

  before_action :redirect_unless_logged_in
  before_action :redirect_unless_owner

  def redirect_unless_owner
    @question = Question.includes(:quiz, quiz: :user).find(params[:id])
    owner = @question.quiz.user
    unless (owner && current_user?(owner))
      redirect_to root_url
    end
  end

  def update
    if @question.update(question_params)
      render json:{}
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  private

  def question_params
    params.require(:question).permit(:question)
  end

end
