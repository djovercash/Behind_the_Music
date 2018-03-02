class ClipsController < ApplicationController

  def index
    @clips = Clip.all
    render json:@clips
  end

  def create
    @clip = Clip.create(clip_params)
    render json:@clip
  end



  private

  def clip_params
    params.require(:clip).permit(:url, :title, :user_id)
  end
end
