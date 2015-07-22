class Api::UsersController < ApplicationController

  def show
    @user = User.find(params[:id]);
    render "api/user/show"
  end

end
