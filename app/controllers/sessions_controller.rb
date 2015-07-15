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

  def destroy
    sign_out
    redirect_to root_url
  end


  private

  def session_params
    params.require(:user).permit(:email, :password);
  end

end
