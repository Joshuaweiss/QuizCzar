class Api::AnswersController < ApplicationController

  before_action :redirect_unless_logged_in
  before_action :redirect_unless_owner

  def redirect_unless_owner
    @answer = Answer.includes(question: {quiz: :user}).find(params[:id])
    owner = @answer.question.quiz.user
    unless (owner && current_user?(owner))
      redirect_to root_url
    end
  end

  def update
    if @answer.update(answer_params)
      render json:{}
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  private

  def answer_params
    params.require(:answer).permit(:answer)
  end

end
