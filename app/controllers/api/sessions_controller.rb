class Api::SessionsController < ApplicationController

  def show
    @user = current_user
    if @user
      render "api/user/show"
    else
      render json:{}
    end
  end

  def guest_sign_in
    @user = User.guest_user
    sign_in(@user)
    render "api/user/show"
  end

  def create
    @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if (@user)
      sign_in(@user)
      render "api/user/show"
    else
      render json: {}, status: :unprocessable_entity
    end
  end

  def destroy
    sign_out
    render json: {}
  end

  def auth_create

    @user_auth = Auth.find_by_auth(request.env['omniauth.auth'].provider,
                                   request.env['omniauth.auth'].uid)

    if @user_auth
      @user = @user_auth.user
      sign_in(@user)
    else
      @user = User.new({
        name: request.env['omniauth.auth'].extra.raw_info.name,
        email: "",
        password: SecureRandom.urlsafe_base64(15)
      })
      @user.auths.new({
        provider: request.env['omniauth.auth'].provider,
        provider_id: request.env['omniauth.auth'].uid
      })
    end


    ## Move To Background Process ?
    url = request.env['omniauth.auth'].info.image
    url = url.gsub("­http","htt­ps")
    url += "?type=large"
    open(url, :allow_redirections => :safe) do |r|
      @user.picture = r.base_uri.to_s
    end


    if (@user.save)
      sign_in(@user)
      redirect_to ""
    else
      render json: @user.errors, status: :unprocessable_entity
    end

  end


  private

  def session_params
    params.require(:user).permit(:email, :password);
  end

end
