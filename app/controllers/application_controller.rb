class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  rescue_from CanCan::AccessDenied do
    head 403
  end

  def default_serializer_options
    { root: false }
  end
end
