class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  protect_from_forgery with: :exception

  def sign_in(user)
    user.reset_session_token
    session[:session_token] = user.session_token
  end

  def sign_out
    current_user.reset_session_token
    session[:session_token] = nil;
  end

  def current_user
    User.find_by(session_token: session["session_token"])
  end

  def logged_in?
    !!current_user
  end

  def redirect_unless_logged_in
    render json: {}, status: 302 unless logged_in?
  end

  def current_user?(user)
    user == current_user
  end

end
