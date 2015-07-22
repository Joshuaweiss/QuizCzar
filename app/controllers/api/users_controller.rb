class Api::UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    render "api/user/show"
  end

  def update
    @user = current_user
    if @user.update(user_params)
      render render "api/user/show"
    else
      render json: @user.errors
    end
  end

  private

  def user_params
    params.require(:user).permit(:picture)
  end

end
