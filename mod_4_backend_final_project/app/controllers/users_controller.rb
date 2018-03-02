class UsersController < ApplicationController

  def index
    @users = User.all
    render json:@users
  end

  def login
    user = User.find_by(username: params[:username])

    if user.try(:authenticate, params[:password])
      @user = user
      render json: @user
    else
      render json:{message: "User Not Found"}, status: 401
    end
  end

end
