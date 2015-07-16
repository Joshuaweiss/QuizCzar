class Api::AnswersController < ApplicationController

  before_action :redirect_unless_logged_in
  before_action :redirect_unless_owner, only: [:update]

  def redirect_unless_owner
    @answer = Answer.includes(question: {quiz: :user}).find(params[:id])
    owner = @answer.question.quiz.user
    unless (owner && current_user?(owner))
      redirect_to root_url
    end
  end

  def create
    @answer = Answer.new(answer_params);
    if @answer.save
      render json: @answer
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  def update
    if @answer.update(answer_params)
      render json:@answer
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  private

  def answer_params
    params.require(:answer).permit(:answer, :question_id, :correct)
  end

end
