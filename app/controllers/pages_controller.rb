class PagesController < ApplicationController
  def index
    authenticate_user!
  end
end
