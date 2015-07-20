class Api::QuizzesController < ApplicationController

  before_action :redirect_unless_logged_in

  def index

    @user = current_user

    @quizzes = nil
    user_id = params[:user_id]
    if (user_id)
      @quizzes = User.find(user_id).quizzes
    else
      @quizzes = Quiz.joins(:user)
    end


    @search_keywords = params[:search_keywords]

    if @search_keywords.presence
      @search_keywords = params[:search_keywords].split
      @quizzes = current_user.quizzes.joins(:user).where("quizzes.name ~* ? OR users.name ~* ?", @search_keywords, @search_keywords);
    end

  end

  def show
    @quiz = Quiz.includes(questions: :answers).find(params[:id])
    @high_score = current_user.grades.where({quiz_id: @quiz.id}).order("correct_answers DESC").first
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
    @quiz = current_user.quizzes.create({name: "Quiz Name"})
    @quiz.save!
    question = @quiz.questions.create!({question: "Question Name"});
    question.add_default_answers

    render 'show'
  end

  def destroy
    @quiz = current_user.quizzes.find(params[:id])
    @quiz.destroy()
    render json:{}
  end


  private

  def quiz_params
    params.require(:quiz).permit(:name)
  end

end
