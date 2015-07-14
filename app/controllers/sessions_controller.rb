class SessionsController < ApplicationController

  def create
    user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if (user)
      sign_in(user)
      render json: {}
    else
      render json: {}, status: :unprocessable_entity
    end
  end


  private

  def session_params
    params.require(:user).permit(:email, :password);
  end

end
