class Api::SessionsController < ApplicationController

  def show
    @user = current_user
    render "api/user/show"
  end

end
