class ClipsController < ApplicationController

  def index
    @clips = Clip.all
    render json:@clips
  end

  def show
    @clip = Clip.find_by(id: params[:id])
    render json:@clip
  end

  def create
    @clip = Clip.create(clip_params)
    render json:@clip
  end

  def update
    @clip = Clip.find(params[:id])
    @clip.update(clip_params)
    render json:@clip
  end

  def destroy
    @clip = Clip.find(params[:id])
    @clip.destroy
    render json: {message: "removed"}
  end

  private

  def clip_params
    params.require(:clip).permit(:url, :title, :handle, :artist, :user_id)
  end
end
