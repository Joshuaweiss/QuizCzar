class Api::QuizzesController < ApplicationController

  before_action :redirect_unless_logged_in

  def index
    @user = current_user
    @grades = @user.grades
    @page = params[:page] || 1

    @quizzes = nil
    user_id = params[:user_id]
    if (user_id)
      @quizzes = User.find(user_id).quizzes.joins(:user)
    else
      @quizzes = Quiz.includes(:user).where(edited: true)
    end

    @search_keywords = params[:search_keywords]

    if @search_keywords.presence
      @search_keywords = @search_keywords.split
      @quizzes = @quizzes.search(@search_keywords)
    end

    @quizzes.page(@page).per(10)
  end

  def show
    @quiz = Quiz.includes(questions: :answers).find(params[:id])
    @high_score = current_user.grades.where({quiz_id: @quiz.id}).order("correct_answers DESC").first;
    @grades = current_user.grades.where({quiz_id: @quiz.id});
  end

  def update
    @quiz = Quiz.find(params[:id])
    unless current_user?(@quiz.user)
      render json: {}, status: 401
      return
    end

    if @quiz.update(quiz_params.merge({edited: true}))
      @quiz.update({edited: false}) unless @quiz.name.presence
      render json: @quiz
    else
      render json: {}, status: :unprocessable_entity
    end
  end

  def create
    @quiz = current_user.quizzes.find_by(edited: false)
    unless @quiz
      @quiz = current_user.quizzes.create({name: "", edited: false})
      @quiz.save!
      question = @quiz.questions.create!({question: ""});
      question.add_default_answers
    end
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
