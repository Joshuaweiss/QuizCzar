class Api::QuestionsController < ApplicationController

  before_action :redirect_unless_logged_in
  before_action :redirect_unless_owner, only: :update

  def redirect_unless_owner
    @question = Question.includes(:quiz, quiz: :user).find(params[:id])
    unless (current_user?(@question.user))
      redirect_to root_url
    end
  end

  def create
    @question = Question.new(question_params)

    redirect_to(root_url) unless current_user?(@question.user)

    if @question.save
      render json: @question
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  def update
    if @question.update(question_params)
      render json:@question
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  private

  def question_params
    params.require(:question).permit(:question, :quiz_id)
  end

end
