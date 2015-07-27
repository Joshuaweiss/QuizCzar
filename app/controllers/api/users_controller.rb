class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      render "api/user/show"
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find(params[:id])
    render "api/user/show"
  end

  def update
    @user = current_user
    if @user.update(user_params)
      render "api/user/show"
    else
      render json: @user.errors
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :picture, :password, :email)
  end

end
