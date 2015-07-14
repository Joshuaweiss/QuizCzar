class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def sign_in(user)
    user.reset_session_token
    session[:session_token] = user.session_token
  end

  def current_user
    User.find_by(session_token: session["session_token"])
  end

  def logged_in?
    !!current_user
  end

  def redirect_unless_logged_in
    redirect_to "/main" unless logged_in?
  end

end
