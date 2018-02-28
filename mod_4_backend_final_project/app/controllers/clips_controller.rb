class ClipsController < ApplicationController

  def index
    @clips = Clip.all
    render json:@clips
  end
end
